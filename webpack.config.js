module.exports = {
    // Other configuration options...
  
    module: {
      rules: [
        // Other rules...
  
        // CSS loader rule
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };