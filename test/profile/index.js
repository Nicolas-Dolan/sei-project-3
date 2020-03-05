/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/user') 
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 