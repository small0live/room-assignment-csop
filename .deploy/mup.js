module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '0.0.11.184',
      username: 'admin',
      // pem: './path/to/pem'
      // password: 'server-password'
      password: "SecretPassword"
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'app',
    path: '../Users/olivianewton/Documents/GitHub/Experiments/room-assignment-csop',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://srv://dapacica:SecretPassword@cluster0.0funy.mongodb.net/test', 
      //MONGO_URL: 'srv://dapacica:SecretPassword@cluster0.0funy.mongodb.net/test',
      MONGO_OPLOG_URL: 'srv://oploguser:SecretPassword2@cluster0.0funy.mongodb.net/local',
    },

    docker: {
      image: 'zodern/meteor:root',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '4.4.12',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
