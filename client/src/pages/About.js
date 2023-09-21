import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/about.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <p className="text-justify mt-2">
        At GadgetBazaar, we're passionate about delivering the best online shopping experience to our customers. We believe that shopping should be convenient, enjoyable, and tailored to your unique preferences. That's why we've built a platform that brings together a vast selection of products, exceptional customer service, and a seamless shopping journey.
        </p>
      </div>
    </div>
  </Layout>
  )
}

export default About