let data = {
    "parameters": [
        {
            "name": "sources",
            "address": "sources",
            "children": [
                {
                    "name": "_source-name",
                    "address": "^sources:(\\w|\\_|\\-|\\/)+$",
                    "children": [
                        {
                            "name": "type",
                            "address": "^sources:(\\w|\\_|\\-|\/)+:type$"
                        },
                        {
                            "name": "url",
                            "address": "^sources:(\\w|\\_|\\-|\/)+:url$"
                        }
                    ]
                }
            ]
        },
        {
            "name": "layers",
            "address": "layers",
            "children": [

            ]
        },
        {
            "name": "cameras",
            "address": "cameras",
            "children": [

            ]
        }
    ]
}
