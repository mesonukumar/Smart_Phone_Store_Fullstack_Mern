import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search1";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart1";
import SerchStyles from '../styles/SerchStyles.css'
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart,setCart]=useCart()
  const navigate=useNavigate()
  return (
    <Layout title={"Search results"}>
      <div className="container-fluid search">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p,i) => (
              <div className="card m-2" style={{ width: "15rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  
                  <div className="d-flex button">
                    <button 
                    className="btn btn-primary btn-sm ms-1 custom-font-size button" 
                    onClick={() => navigate(`/product/${p.slug}`)}
                    >More Details
                    </button>
                    <button 
                    className="btn btn-secondary btn-sm ms-1 custom-font-size button"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      alert("Item Added to cart");
                    }}
                    >
                      ADD TO CART
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;