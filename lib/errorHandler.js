'use strict'

module.exports = {
    errorHandler: (error) => {
        console.error(error)
        throw new Error('Oh, something happened but don\'t worry.')
    }
}
