import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./InitialAssesment.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Image, Row, Modal, Button, Form } from "react-bootstrap";
import GetYourPerfectProposal from "../GetYourPerfectProposal/GetYourPerfectProposal";
import Loader from "../Spinner/Loader";
import { toast } from "material-react-toastify";
import CurrencyFormat from "react-currency-format";
import serviceableZipCodes from "../../allowedZipCodes";

const InitialAssessment = () => {
  const usrFormRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { userId } = useParams();


  const [showModal, setShowModal] = useState(false);
  const [showNotServiceableModal, setShowNotServiceableModal] = useState(false);
  const signupBonus = 3000;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let fieldName =
      id === "non-serviceable-usr-firstname"
        ? "firstName"
        : id === "non-serviceable-usr-lastname"
        ? "lastName"
        : id === "non-serviceable-usr-email"
        ? "email"
        : id;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleOpenModal = () => {
    if (
      data.address.zip_code &&
      serviceableZipCodes.includes(parseInt(data.address.zip_code))
    ) {
      setShowModal(true);
    } else {
      setShowNotServiceableModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowNotServiceableModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Always prevent default initially

    if (usrFormRef.current && !usrFormRef.current.checkValidity()) {
      event.stopPropagation(); // Stop further processing if invalid
    } else {
      onModalSubmit(); // Call function when valid
    }

    setValidated(true);
  };

  const onModalSubmit = async () => {
    try {
      const payload = {
        userId,
        ...formData,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/add_nonservice_user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success(
          "Thank you for your interest! We'll notify you when we're available in your area."
        );
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to submit your information. Please try again.");
    } finally {
      handleCloseModal();
    }
  };

  const fetchData = async () => {
    console.log("Fetching data for:", userId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/get_saving_summary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId
          }),
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setData(result);
        localStorage.setItem(
          "proposalDetails",
          JSON.stringify({ userId, isProposalReady: false })
        );
        window.dispatchEvent(new Event("proposalDetailsUpdated"));
      } else {
        toast.error("Something went wrong! ");
        console.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong! ");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Set up the required variables
    window._ubad = 'florida.gosunnyai.com';
    window._ubaq = window._ubaq || [];
    window._ubaq.push(['trackGoal']);

    // Create and append the script
    const ub_script = document.createElement('script');
    ub_script.type = 'text/javascript';
    ub_script.src = '//' + window._ubad + '/_ub/static/ets/t.js';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ub_script, s);

    // Cleanup function
    return () => {
      s.parentNode.removeChild(ub_script);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={
          styles["loaderWrapper"] +
          " w-100 d-flex align-items-center justify-content-center"
        }
      >
        <Loader />
      </div>
    );
  }
  return (
    <div className={styles["initial-assessment-container"]}>
      <p className={styles["heading-text"]}>Here's What You'll Save</p>
      <div className={styles["estimated-row"]}>
        <Row className="h-100">
          <div className="col-lg-4 col-md-12 d-none d-lg-block">
            <div className={styles["roof-image-div"] + " p-3 h-100"}>
              <Image
                className={styles["roof-image"]}
                src={data.image_data}
                alt="electricity"
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-12 h-100 mb-2 mb-md-0">
            <div className="h-50 pb-2">
              <div
                className={[
                  styles["annual-savings-div"] + " p-2 p-md-3 w-100 ",
                ]}
              >
                <p
                  className={styles["estimated-year-1-savings-text"] + " mb-0"}
                >
                  Estimated Year 1 Savings
                </p>
                <p className={styles["zero-down-payment"]}>
                  With $0 Down Payment
                </p>
                <Row>
                  <div className="col-lg-4 col-md-6 col-6 d-flex flex-column justify-content-end pe-0">
                    <p className={styles["solar-savings-text"] + " mb-0"}>
                      Electricity Savings:{" "}
                      <CurrencyFormat
                        value={Math.round(data.saving_range_from)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />{" "}
                      -{" "}
                      <CurrencyFormat
                        value={Math.round(data.saving_range_to)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </p>
                    <p className={styles["sign-up-bonus-text"] + " mb-0"}>
                      Sign-up Bonus{" "}
                      <CurrencyFormat
                        value={3000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </p>
                  </div>
                  <div className="col-lg-8 col-md-6 col-6 d-flex justify-content-end align-items-end ps-0">
                    <p className={styles["savings-range-text"] + " mb-0"}>
                      <CurrencyFormat
                        value={Math.round(data.saving_range_from + signupBonus)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />{" "}
                      -{" "}
                      <CurrencyFormat
                        value={Math.round(data.saving_range_to + signupBonus)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </p>
                  </div>
                </Row>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 order-3 mb-2 mb-lg-0 d-block d-lg-none">
              <div className={styles["roof-image-div"] + " p-2 h-100"}>
                <Image
                  className={styles["roof-image"]}
                  src={data.image_data}
                  alt="electricity"
                />
              </div>
            </div>
            <Row>
              <div className="col-lg-3 col-md-3 col-4">
                <div
                  className={
                    styles["panel-count-div"] +
                    " h-100 p-2 p-md-3 w-100 d-flex flex-column justify-content-between"
                  }
                >
                  <p className={styles["panel-count-text"] + " mb-0"}>
                    Panel Count
                  </p>
                  <p
                    className={styles["panel-count-number"] + " mb-0 text-end"}
                  >
                    {data.panel_number}
                  </p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-8 ps-0">
                <div
                  className={
                    styles["panel-count-div"] +
                    " h-100 w-100 d-flex justify-content-between p-2 p-md-3"
                  }
                >
                  <div className={styles["solar-col"] + " w-50"}>
                    <p
                      className={
                        styles["solar-coverage-heading-text"] + " mb-0"
                      }
                    >
                      Solar Coverage
                    </p>
                    <p className={styles["solar-coverage-text"] + " mb-0"}>
                      Solar power will provide {Math.round(data.energy_covered)}
                      % of your annual energy needs
                    </p>
                  </div>
                  <div className={styles["solar-coverage-progress-bar-div"]}>
                    <CircularProgressbar
                      value={
                        data.energy_covered >= 100
                          ? data.energy_covered
                          : data.energy_covered - 10
                      }
                      text={`${Math.round(data.energy_covered)}%`}
                      strokeWidth={18}
                      styles={buildStyles({
                        pathColor: `#4ca6a6`, // Green progress bar
                        textColor: "#000", // Text color
                        trailColor: "#b5d8cc", // Background color
                        textSize: "0.87rem",
                        fontWeight: 700,
                      })}
                    />
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Row>
      </div>
      <div className={styles["check-text-div"]}>
        <p className={styles["check-text"]}>
          Get a{" "}
          <span className={styles["primary-color"]}>
            <CurrencyFormat
              value={signupBonus}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>{" "}
          check after installation!
        </p>
      </div>
      <div
        className={
          styles["propsal-button-div"] +
          " d-flex align-items-center justify-content-between flex-wrap p-md-3"
        }
      >
        <p className={styles["skip-call-text"]}>
          Skip the{" "}
          <span className={styles["primary-color"]}> sales calls & fees</span>,
          finish now in 5 minutes!
        </p>
        <button
          id="open-proposal-form-btn"
          onClick={handleOpenModal}
          className={styles["get-proposal-button"] + " p-3"}
        >
          Finish My Proposal!
        </button>
      </div>
      {showModal && <GetYourPerfectProposal closeModal={handleCloseModal} />}
      <Modal show={showNotServiceableModal} onHide={handleCloseModal}>
        <Modal.Body>
          <div className="d-flex justify-content-end ">
            <button
              type="button"
              class="btn-close"
              onClick={() => setShowNotServiceableModal(false)}
            ></button>
          </div>
          <p>
            Hey, we're so sorry but Sunny hasn't made it to your neighborhood
            yet. Check back soon as we're rapidly expanding our service areas.
          </p>
          <p className="fw-bold">
            Fill out the form, and we'll notify you when we arrive!
          </p>
          <Form
            ref={usrFormRef}
            name="non-serviceable-usr-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className={styles["get-approved-form"] + " my-3"}>
              <Row className="my-2">
                <div className="col-6">
                  <Form.Label
                    className={styles["form-label"] + " my-2"}
                    htmlFor="non-serviceable-usr-firstname"
                  >
                    First Name*
                  </Form.Label>
                  <Form.Control
                    required
                    className={styles["form-input"]}
                    placeholder="John"
                    type="text"
                    id="non-serviceable-usr-firstname"
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
                <div className="col-6">
                  <Form.Label
                    className={styles["form-label"] + " my-2"}
                    htmlFor="non-serviceable-usr-lastname"
                  >
                    Last Name*
                  </Form.Label>
                  <Form.Control
                    required
                    className={styles["form-input"]}
                    placeholder="Smith"
                    type="text"
                    id="non-serviceable-usr-lastname"
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
                  htmlFor="non-serviceable-usr-email"
                >
                  Email*
                </Form.Label>
                <Form.Control
                  required
                  className={styles["form-input"]}
                  pattern="^[^@]+@[^@]+\.[^@]+$"
                  placeholder="youremail@gmail.com"
                  type="email"
                  id="non-serviceable-usr-email"
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
                <div className="col-12 text-end d-flex align-items-end justify-content-end">
                  <button
                    id="non-serviceable-form-submit"
                    className={styles["form-input-button"]}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Row>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InitialAssessment;
