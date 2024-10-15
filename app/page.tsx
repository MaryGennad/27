"use client"

import { useEffect, useState } from "react";
import '../app/app.css';


function App() {

    interface IProduct {
        name: string,
        image: string,
        ingreS: string[],
        description: string,
    }
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {
        // let res = await fetch(process.env.REACT_APP_API + '/api/product')
        let res = await fetch('/api/product')
        let resJson = await res.json()
        setProducts(resJson)
    }

    async function onChange(paramName: 'name' | 'description' | 'image', value: string, productIndex: number) {
        let newProducts = [...products]
        newProducts[productIndex][paramName] = value
        setProducts(newProducts)

    }
    return (
        <div className="wrapper">
            {products.map((product, productIndex) => {
                return (
                    <div key={productIndex}>
                        {/*HEADER*/}
                        <div className="product" >
                            <input
                                className="h1"
                                value={product.name}
                                onChange={(e) => {
                                    let value = e.target.value
                                    onChange('name', value, productIndex)
                                }}
                            />
                        </div>

                        {/*IMAGE*/}
                        <div className="img">
                            <img className="imgs" src={product.image} />
                            Картинку можно поменять тут :
                            <input className="product"
                                value={product.image}
                                onChange={(e) => {
                                    let value = e.target.value
                                    onChange('image', value, productIndex)
                                }}
                            />
                        </div>
                        <br></br>
                        {/* INGREDIENTS */}
                        <div className="product">{
                            product.ingreS?.map((ingredient, ingredientIndex) => {
                                return (
                                    <div className="product ingredient" key={ingredientIndex}>
                                        <input value={ingredient}
                                            onChange={(e) => {
                                                let value = e.target.value
                                                let newProducts = [...products]
                                                // newProducts[productIndex][paramName] = value                                         
                                                newProducts[productIndex].ingreS[ingredientIndex] = value
                                                setProducts(newProducts)
                                            }} />
                                        <button
                                            className="button"
                                            onClick={() => {
                                                // let value = e.target.value
                                                let newProducts = [...products]
                                                newProducts[productIndex].ingreS.splice(ingredientIndex, 1)
                                                setProducts(newProducts)
                                            }}
                                        >Удалить</button>
                                    </div>
                                )
                            }
                            )}
                            <br></br>
                            <button
                                className="button"
                                onClick={(e) => {
                                    let newProducts = [...products]
                                    newProducts[productIndex].ingreS.push('Новый ингредиент')
                                    setProducts(newProducts)
                                }}
                            >Добавить ингредиент
                            </button>
                        </div>
                        <br></br>
                        <br></br>
                        {/*DESCRIPTION*/}
                        <div className="product">
                            <textarea value={product.description} rows={5}
                                onChange={(e) => {
                                    let value = e.target.value
                                    onChange('description', value, productIndex)
                                }}
                            >
                            </textarea>
                        </div>
                        <div className="save">
                            <button className="button"
                                onClick={async () => {
                                    let res = await fetch('/api/product',
                                        {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json;charset=utf-8'
                                            },
                                            body: JSON.stringify(product)
                                        })
                                    let resJson = await res.json()
                                    console.log(resJson);
                                }}
                            >Сохранить</button></div>
                    </div>
                )
            })}
            <div className="buttonProducts">
                {/* добавить блюдо */}
                <button className="button"
                    onClick={(e) => {
                        let newProducts = [...products]
                        newProducts.push({

                            name: "Новое блюдо",
                            image: "https://chefrestoran.ru/wp-content/uploads/2018/08/shutterstock_413329057.jpg",
                            ingreS: [
                                "Ингредиент 1",
                                "Ингредиент 2",
                            ],
                            description: "Описание приготовления",
                            // "v": 0
                        })
                        setProducts(newProducts)
                    }}
                >Добавить блюдо
                </button>
                {/* удалить блюдо */}
                {/* <button className="button"
                    onClick={() => {
                        // let value = e.target.value
                        let newProducts = [...products]
                        newProducts.splice(newProducts, 1)
                        setProducts(newProducts)
                    }}
                >Удалить блюдо</button> */}
            </div>
        </div>
    );
}
export default App;
