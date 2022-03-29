import Exception from "./Exception.js";

export default class ApiClient {
    get(url, data) {
        return new Promise((resolve, reject) => {
            switch (url) {
                case 'SearchProducts':
                    resolve(this._getProductMocks());
                    break;
                case 'GetProduct':
                    if (typeof data === 'object' && data.hasOwnProperty('id')) resolve(this._getProductMock(data.id));
                    else reject(new Exception('NOT_FOUND', 404));
                    break;
                default:
                    reject(new Exception('NOT_FOUND', 404));
            }
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            switch (url) {
                case 'Purchase':
                    try {
                        data.forEach((item) => {
                            this._getProductMock(item.product_id);
                            if (item.amount < 1) throw new Exception('INVALID_AMOUNT', 406);
                            console.log(`Item ${item.product_id} amount ${item.amount} valid!`);
                        });
                        resolve();
                    } catch (exception) {
                        reject(new Exception('INVALID_PURCHASE_DATA', 406, data));
                    }

                    break;
                default:
                    reject(new Exception('NOT_FOUND', 404));
            }
        });
    }

    _getProductMock(id) {
        let product = this._getProductMocks().find((product) => {
            return product.id === id;
        });
        if (!product) throw new Exception('PRODUCT_NOT_FOUND', 404);
        else return product;
    }

    _getProductMocks() {
        return [
            {
                id: 1,
                name: 'Toilet paper - extra funny',
                photo: 'https://m.media-amazon.com/images/I/9133wpvx-uL._AC_SY355_.jpg',
                price: 34.50
            },
            {
                id: 23,
                name: 'Beer can holder',
                photo: 'https://m.media-amazon.com/images/I/71YsQ7uS+PL._SL1500_.jpg',
                price: 0.43
            },
            {
                id: 22,
                name: 'Top quality mouse',
                photo: 'https://m.media-amazon.com/images/I/51Fjo6qYX5L._AC_SY355_.jpg',
                price: 33.12
            },
            {
                id: 73,
                name: 'Phone protector mask',
                photo: 'https://cdn01.pinkoi.com/product/BwucTNFK/3/640x530.jpg',
                price: 2.76
            },
            {
                id: 13,
                name: 'Awesome laptop bag',
                photo: 'https://image.artistshot.com/pd.24463443.184.459273.s3.1-front-customized-111111-none-x102.5y34.5-160-800x800.jpg',
                price: 44.30
            },
            {
                id: 45,
                name: 'Funny speakers',
                photo: 'https://cdn.trendhunterstatic.com/thumbs/little-pig-speakers.jpeg',
                price: 65.20
            }
        ];
    }
}