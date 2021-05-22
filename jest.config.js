//configurar em dois diretorios diferentes

module.exports = {
    reporters: [
      'default',
      [ 'jest-junit', {
        outputName: 'test-results.xml',
        uniqueOutputName: 'false',
      } ]
    ]
  };