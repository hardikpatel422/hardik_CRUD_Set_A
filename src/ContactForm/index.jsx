import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AddContact, getContact, updateContact } from '../../Redux/Action/ContactAction';

import shortid from "shortid";

export default function ContactForm() {

  let { id } = useParams();
  console.log("id", id);
  let history = useHistory();
  const dispatch = useDispatch()
  const [Name, setName] = useState('');
  const [number, setnumber] = useState('');
  const [gender, setgender] = useState('');
  const getcontactSelector = useSelector((state) => state.contacts.contact)
  console.log("getcongetcontactSelector", getcontactSelector);


  const numbervalidation =/^[6-9]\d{9}$/g;
  const namengendervali = /^[a-zA-Z]+$/g;

  

  const submithandler = (e) => {
     e.preventDefault()

    const formdata = {
      id: shortid.generate(),
      Name: Name,
      Number: number,
      Gender:gender
    }
    if (id) {
      const formdata = {
        id: id,
        Name: Name,
        Number: number,
        Gender:gender
      }
      dispatch(updateContact(formdata));
      history.push("/ShowContact");
    }

    else {
      dispatch(getContact(""));
      dispatch(AddContact(formdata));
      console.log("formdata" + JSON.stringify(formdata));
      history.push("/ShowContact");
    }
  }
  useEffect(() => {
    if (id) {
      dispatch(getContact(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("getcontactSelector", getcontactSelector);
    if (getcontactSelector != null) {
      setName(getcontactSelector.Name)
      setnumber(getcontactSelector.Number)
      setgender(getcontactSelector.gender)

    }
  }, [getcontactSelector]);

  return (

    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2" style={{ fontSize: 40, fontWeight: "bold" }}>Contact Form</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form >
            <div className="form-group">
              <input
                className="form-control my-2"
                type="text"
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Phone"
                value={number}
                onChange={(e) => setnumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <button
                type="submit"
                onClick={submithandler}
                className="btn btn-block btn-dark"
              >
                {id ? "Update Contact" : "Add Contact"}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  )
}