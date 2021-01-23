const tool = require('../tool/tool'); 
const license = require('./license');

module.exports = function (app) {
  global.license = tool.getLicense();//读取挂载授权文件
  global.publicKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMt7aNnin3JXOx7BZp4WhKMAGycoU9tGB/b2yd4gW8GPFr9DpkHHdaMB4QdnOiMx/+rxXsabY09kPbjUCZggJPHu+NzfHLhOMAaOVoWqQ7uSUaAyArpLewi+AdF5WvFsOrWY2urGmC0neiTKSFEDVJYZYS4VVTqmO3qQw9gvlUxVAgMBAAECgYAfndpJ2JubwZAPFE/kim0rgo21hN+at4PvTKNLH04CgkAvkcxYdiyCGn2jj9eJtnAkSkLGq0hAArxQZqni+EOlCKmEs04ijBvE93FcTVo2g/1zIJfwwq0LfVzr3+uFiagd5er/s3gTUMfnwGFLsBCdajNRGde24Uq2f48qyJ3nwQJBAPe2zXyfk4Da9TTXkcdGlrVOkXz7LBlbEK24tlFXbeh5LoLq3Y+DGPjmLhs+wNTxGzEsmWPWEASFkg0pJUbOkYUCQQDSSdgoHjgUCwDtiWrUuLdmIERhPIQzIqehdVitfzDTLoU/5hsUpXAScNrYvkri75+KY8+q6itJAID0sTDD52CRAkBFoXcFjv2xfNrsbaQmterrMBipXxk4T2bSzldBaigU7utqFYcOLjW40UsokW027kdMfVLow2VhQAKb/HLkAnDZAkEAp3InjeJqMwOEDKFEkPg5CTgeWvMOLY2lv3oqT5Sc8zvy3KvE2o7Vi8mTac004jl+Z3sMzILETs/4318MfqIKEQJAHl4qp/BVqoglACcmX8QdnXBZezRG774dVrmf0kHJ69U20AyX0jO1/wKO4iSvGHhZsDXDtwPxRjH6rC/Z/qGf3Q==";

  let licenseCheck = false; // 开启授权验证
  if( licenseCheck && license.check() == false ){
    return false; 
  }

}