'use strict';

import http from 'http';
import bunyan from 'bunyan';

let url  = 'api.unblock-us.com';

export class UnblockUs {
    constructor (opts) {
        this.setUsername(opts.username);
        this.setPassword(opts.password);
        this.setSecure(opts.secure);
        this.log = bunyan.createLogger({
            name: 'unblock-us-client',
            stream: process.stdout,
            level: opts.logLevel || 'error'
        });
    }

    /**
     * Setter for 'this.secure'. This will make curl calls happen via HTTPS
     *
     * @method setSecure
     *
     * @param {Boolean} bool
     *
     * @return {UnblockUsClient}
     *
     * @public
     */
    setSecure (bool) {
        this.secure = bool === true;

        return this;
    }

    /**
     * Getter for 'this.secure', if this is true, curl calls will be using HTTPS
     *
     * @method isSecure
     *
     * @return {boolean}
     *
     * @public
     */
    isSecure () {
        return this.secure;
    }

    /**
     * Setter for 'this.username'
     *
     * @method setUsername
     *
     * @param {String} username
     *
     * @return {UnblockUsClient}
     *
     * @public
     */
    setUsername (username) {
        this.username = username || '';
        return this;
    }

    /**
     * Getter for 'this.username'
     *
     * @method getUsername
     *
     * @return {String}
     *
     * @public
     */
    getUsername () {
        return this.username || '';
    }

    /**
     * Setter for 'this.password'
     *
     * @method setPassword
     *
     * @param {String} password
     *
     * @return {UnblockUsClient}
     *
     * @public
     */
    setPassword (password) {
        this.password = password || '';
        return this;
    }

    /**
     * Getter for 'this.password'
     *
     * @method getPassword
     *
     * @return {String}
     *
     * @public
     */
    getPassword () {
        return this.password || '';
    }

    /**
     * Method to get the base url for the unblock-us api url
     *
     * @method getBaseUrl
     *
     * @return {string}
     *
     * @public
     */
    getBaseUrl() {
        return url;
    }

    /**
     * Method to activate the current IP address for use with unblock-us
     *
     * @method activate
     *
     * @return {Promise}
     *
     * @public
     *
     * @async
     */
    activate () {
        let self = this;
        return new Promise(function (resolve, reject) {
            let opts = {
                host: self.getBaseUrl(),
                path: '/login?' + self.getUsername() + ':' + self.getPassword(),
                port: self.isSecure() ? 443 : 80
            };

            self.log.info(opts, 'Calling Unblock US to Activate');

            http.get(opts, function(res) {
                if(parseInt(res.statusCode) === 200) {
                    return resolve();
                }

                self.log.error(opts, 'Failed to authenticate with unblock-us');
                return reject(new Error('Failed to authenticate with unblock-us'));
            }).on('error', function(e) {
                self.log.error(opts, e.message);
                reject(e);
            });
        });
    }
}