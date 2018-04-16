module.exports = {
    "env": {
      "es6": true,
      "node": true,
        "browser": true
    },
    "parserOptions": {
      "sourceType": "module"
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
