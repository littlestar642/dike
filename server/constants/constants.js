 const dataConsentStatus = {
     "ACTIVE": 1,
     "REJECTED": 2,
     "REVOKED": 3,
     "PAUSED": 4
 }

 const dataFetchStatus = {
     "READY":1,
     "DENIED":2,
     "TIMEOUT":3
 }

 module.exports = {
     dataConsentStatus,
     dataFetchStatus
 }