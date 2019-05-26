module.exports = {
    "extends": "airbnb",
    "rules": {
        "import/no-extraneous-dependencies": ["error", {"packageDir": __dirname}],
        "indent": ["error", "tab"],
        "no-console": "off",
        "no-plusplus": ["error",
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "no-tabs": "off",
        "react/jsx-indent": ["error", "tab"],
        "react/jsx-indent-props": ["error", "tab"],
        "react/jsx-one-expression-per-line": "off",
        "react/prop-types": "off"
    },
    "env": {
        "browser": true,
        "node": true
    }
}