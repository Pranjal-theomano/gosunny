import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row } from "react-bootstrap";
import { useCreateUrlWithParams } from "../../utils/urlHelper";
import { cleanPhoneNumber } from '../../utils/phoneUtils';
import styles from "./GetYourPerfectProposal.module.scss";
import Loader from "../Spinner/Loader";
import { toast } from "material-react-toastify";
import { isMobile } from "react-device-detect";
import greenCloseIcon from "../../assets/svgs/greenClose.svg";

const GetYourPerfectProposal = ({ closeModal }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4; // Number of checkboxes
  const [checkedStates, setCheckedStates] = useState(
    Array(totalSteps).fill(false)
  );

  const modalRef = useRef(null); // Reference for modal container
  const { userId } = useParams();
  const navigate = useNavigate();
  const createUrlWithParams = useCreateUrlWithParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isHomeOwner: false,
    isRoofGood: false,
    isCreditGood: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let fieldName =
      id === "firstname" ? "firstName" : id === "lastname" ? "lastName" : id;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // const manageIncrementalState = (index) => {
  //   setCheckedStates((prev) => {
  //     const newCheckedStates = [...prev];
  //     if (prev[index]) {
  //       // Unchecking: Uncheck current and all after it
  //       for (let i = index; i < newCheckedStates.length; i++) {
  //         newCheckedStates[i] = false;
  //       }
  //     } else {
  //       // Checking: Only allow checking if the previous one is checked
  //       if (index === 0 || prev[index - 1]) {
  //         newCheckedStates[index] = true;
  //       }
  //     }
  //     return newCheckedStates;
  //   });
  // };

  const handleCheckboxChange = (field) => {
    var fieldVal = formData[field];
    console.log({ field, fieldVal });
    setFormData((prev) => {
      const newState = { ...prev, [field]: !fieldVal };
      if (fieldVal) {
        if (field === "isHomeOwner") {
          newState.isRoofGood = false;
          newState.isCreditGood = false;
        }
        if (field === "isRoofGood") {
          newState.isCreditGood = false;
        }
      }
      return newState;
    });
    // manageIncrementalState(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Always prevent default initially

    const form = event.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Stop further processing if invalid
    } else {
      onModalSubmit(); // Call function when valid
    }

    setValidated(true);
  };

  const onModalSubmit = async () => {
    setIsLoading(true);
    try {

      const formDataCopy = { ...formData };
      if(formDataCopy.phone){
        formDataCopy.phone = cleanPhoneNumber(formDataCopy.phone);
      }
      const dataToSubmit = { ...formDataCopy, userId };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/submit_data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully");
        const customDesignURL = createUrlWithParams(`/custom-design/${userId}`);
        navigate(customDesignURL);
      } else if (response.status === 400) {
        setIsLoading(false);
        const result = await response.json();
        console.log("Error submitting data:", result.message);
        toast.error("Error: " + result.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Unexpected response status:", response.status);
        toast.error("Something went wrong!");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting data:", error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };
  return (
    <div className={styles["modal-overlay"]}>
      {isLoading && (
        <div className={styles["get-approved-modal"]}>
          <div className={styles["loader-wrapper"]}>
            <Loader />
          </div>
        </div>
      )}

      {!isLoading && (
        <div className={styles["get-approved-modal"]} ref={modalRef}>
          {isMobile && (
            <div onClick={closeModal} className={styles["close-button"]}>
              <img src={greenCloseIcon} alt="" />
            </div>
          )}
          <p className={styles["heading-text"]}>Get Your Perfect Proposal</p>
          <p className={styles["sub-heading-text"]}>
            Please{" "}
            <span className={styles["sub-heading-text-span"]}>
              confirm the following
            </span>{" "}
            to move forward:
          </p>
          <Form
            name="proposal-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className={styles["checkbox-container"]}>
              <div className="mt-2 d-flex align-items-center themedForm">
                <Form.Check
                  required
                  className={styles["checkbox-input"]}
                  inputClassName={styles["checkbox-input"]}
                  type="checkbox"
                  id="isHomeOwner"
                  checked={formData.isHomeOwner}
                  onChange={() => handleCheckboxChange("isHomeOwner", 0)}
                />
                <Form.Label
                  className={styles["checkbox-label"] + " mb-0"}
                  htmlFor="isHomeOwner"
                >
                  You are the owner of the home
                </Form.Label>
              </div>
              <div className="mt-2 d-flex align-items-center">
                <Form.Check
                  required
                  disabled={!formData.isHomeOwner}
                  className={styles["checkbox-input"]}
                  type="checkbox"
                  id="isRoofGood"
                  checked={formData.isRoofGood && formData.isHomeOwner}
                  onChange={() => handleCheckboxChange("isRoofGood", 1)}
                />
                <Form.Label
                  className={styles["checkbox-label"] + " mb-0"}
                  htmlFor="isRoofGood"
                >
                  Your roof is in good condition, less than 15 years old
                </Form.Label>
              </div>
              <div className="mt-2 d-flex align-items-center">
                <Form.Check
                  required
                  disabled={!formData.isRoofGood}
                  className={styles["checkbox-input"]}
                  type="checkbox"
                  id="isCreditGood"
                  checked={
                    formData.isCreditGood &&
                    formData.isRoofGood &&
                    formData.isHomeOwner
                  }
                  onChange={() => handleCheckboxChange("isCreditGood", 2)}
                />
                <Form.Label
                  className={styles["checkbox-label"] + " mb-0"}
                  htmlFor="isCreditGood"
                >
                  Your credit score is above 650
                </Form.Label>
              </div>
            </div>

            <div className={styles["get-approved-form"] + " my-3"}>
              <Row className="my-2">
                <div className="col-6 pe-1">
                  <Form.Label
                    className={styles["form-label"] + " my-2"}
                    htmlFor="firstname"
                  >
                    First Name*
                  </Form.Label>
                  <Form.Control
                    className={styles["form-input"]}
                    required
                    disabled={!formData.isCreditGood}
                    placeholder="John"
                    type="text"
                    id="firstname"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback
                    className={styles["form-feedback"]}
                    type="invalid"
                  >
                    {" "}
                    Please enter a valid first name
                  </Form.Control.Feedback>
                </div>
                <div className="col-6 ps-1">
                  <Form.Label
                    className={styles["form-label"] + " my-2"}
                    htmlFor="lastname"
                  >
                    Last Name*
                  </Form.Label>
                  <Form.Control
                    className={styles["form-input"]}
                    required
                    disabled={!formData.isCreditGood}
                    placeholder="Smith"
                    type="text"
                    id="lastname"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback
                    className={styles["form-feedback"]}
                    type="invalid"
                  >
                    {" "}
                    Please enter a valid last name
                  </Form.Control.Feedback>
                </div>
              </Row>
              <div className="my-2">
                <Form.Label
                  className={styles["form-label"] + " my-2"}
                  htmlFor="email"
                >
                  Email*
                </Form.Label>
                <Form.Control
                  className={styles["form-input"]}
                  pattern="^[^@]+@[^@]+\.[^@]+$"
                  required
                  disabled={!formData.isCreditGood}
                  placeholder="youremail@gmail.com"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback
                  className={styles["form-feedback"]}
                  type="invalid"
                >
                  {" "}
                  Please provide a valid email
                </Form.Control.Feedback>
              </div>
              <Row className="my-2">
                <Form.Label
                  className={styles["form-label"] + " my-2"}
                  htmlFor="phone"
                >
                  Phone Number*
                </Form.Label>
                <div className="col-8 pe-0">
                  <Form.Control
                    className={styles["form-input"]}
                    pattern="^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?(\d{3})[-.\s]?(\d{4})$"
                    required
                    disabled={!formData.isCreditGood}
                    placeholder="123-123-1234"
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={
                      validated && !/^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?(\d{3})[-.\s]?(\d{4})$/.test(formData.phone)
                    }
                  />
                  <Form.Control.Feedback
                    className={styles["form-feedback"]}
                    type="invalid"
                  >
                    {" "}
                    Please provide a valid phone
                  </Form.Control.Feedback>
                </div>
                <div className="col-4 text-end d-flex align-items-start justify-content-end ps-0">
                  <button
                    disabled={!formData.isCreditGood}
                    id="proposal-form-submit"
                    className={styles["form-input-button"]}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Row>
            </div>
          </Form>
          <p className={styles["term-condition-text"]}>
            By clicking "Submit", I authorize SunnyAI to call me and text
            messages to me about SunnyAI products and services at the telephone
            number I entered above, even if I am on a national or state "Do Not
            Call" list. Message and data rates may apply. Consent for calls &
            texts is optional. You can opt out anytime. You also agree to our
            Terms of Service.
            <br />
            <span>
              <a href="https://www.gosunnyai.com/legal" target="_blank">
                Terms of Service
              </a>
            </span>
            {" | "}
            <span>
              <a href="https://www.gosunnyai.com/privacy" target="_blank">
                Privacy Policy
              </a>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GetYourPerfectProposal;
