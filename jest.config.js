//configurar em dois diretorios diferentes

module.exports = {
    reporters: [
      'default',
      [ 'jest-junit', {
        outputName: 'Test-results.xml',
        uniqueOutputName: 'false',
      } ]
    ]
  };