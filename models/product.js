const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        sku: {
            type: String,
            trim: true
        },
        url: {
            type: String
        },
        brand: {
            name: {
                type: String
            },
            sub_brand: {
                type:String
            }
        },
        media: {
            standard: { 
                type : Array
            },
            thumbnail: { 
                type : Array , 
                "default" : [] 
            }
        },
        meta: {
            breadcrumbs: {
                type: Object
            },
            bert_original_classification: {
                type: Object
            },
            reference: {
                type: String
            }
        },
        website_id: {
            type: mongoose.Schema.Types.ObjectId
        },
        price: {
            offer_price: {
                currency: {
                    type: String
                },
                value: {
                    type: Number
                }
            },
            regular_price: {
                currency: {
                    type: String
                },
                value: {
                    type: Number
                }
            },
            basket_price: {
                currency: {
                    type: String
                },
                value: {
                    type: Number
                }
            }
        },
        description_text: {
            type: String
        },
        spider: {
            type: String
        },
        stock: {
            available: {
                type: Boolean
            }
        },
        classification: {
            type: Object
        },
        similar_products: {
            meta: {
                total_results: {
                    type: Number
                },
                min_price: {
                    regular: {
                        type: Number
                    },
                    offer: {
                        type: Number
                    },
                    basket: {
                        type: Number
                    }
                },
                max_price: {
                    regular: {
                        type: Number
                    },
                    offer: {
                        type: Number
                    },
                    basket: {
                        type: Number
                    }
                },
                avg_price: {
                    regular: {
                        type: Number
                    },
                    offer: {
                        type: Number
                    },
                    basket: {
                        type: Number
                    }
                },
                avg_discount: {
                    type: Number
                }
            },
            website_results: {
                type: Object
            }
        },
        positioning: {
            page: {
                type: Number
            },
            rank: {
                type: Number
            }
        },
        lvl_url: {
            type: String
        },
        price_changes: {
            type: Array
        },
        price_positioning: {
            type: Number
        },
        price_positioning_text: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
    // ,{ timestamps : true }
)

module.exports = Product = mongoose.model('product', productSchema)