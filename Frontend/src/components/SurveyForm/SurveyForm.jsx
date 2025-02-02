import { useState } from "react";
import axios from "axios";

const PcosSurveyForm = () => {
  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    blood_group: 0,
    period_months: 0,
    gained_weight: false,
    excessive_hair_growth: false,
    skin_darkening: false,
    hair_loss: false,
    pimples: false,
    eat_fast_food: false,
    reg_exercise: false,
    mood_swings: false,
    reg_periods: false,
    period_days: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      gained_weight: parseInt(formData.gained_weight ? 1 : 0, 10),
      excessive_hair_growth: parseInt(
        formData.excessive_hair_growth ? 1 : 0,
        10
      ),
      skin_darkening: parseInt(formData.skin_darkening ? 1 : 0, 10),
      hair_loss: parseInt(formData.hair_loss ? 1 : 0, 10),
      pimples: parseInt(formData.pimples ? 1 : 0, 10),
      eat_fast_food: parseInt(formData.eat_fast_food ? 1 : 0, 10),
      reg_exercise: parseInt(formData.reg_exercise ? 0 : 1, 10), // reversed logic
      reg_periods: parseInt(formData.reg_periods ? 1 : 0, 10),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8801/predict-pcos",
        preparedData
      );
      setPrediction(response.data.prediction);
      await axios.post("http://localhost:8801/update_pcos", {
        prediction: response.data.prediction,
        user_id: localStorage.getItem("user_id"),
      });
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  const generateReport = () => {
    setShowReport(true);
  };

  const closeReport = () => {
    setShowReport(false);
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "30px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    label: {
      display: "flex",
      flexDirection: "column",
      color: "#555",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      outline: "none",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    checkboxLabel: {
      margin: 0,
      color: "#555",
    },
    button: {
      padding: "10px 15px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#862949",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      margin: "5px",
    },
    buttonHover: {
      backgroundColor: "#aa4768",
    },
    prediction: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#e0f7fa",
      borderRadius: "5px",
      textAlign: "center",
      color: "#00796b",
    },
    popup: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    popupContent: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "500px",
      width: "100%",
    },
    closeButton: {
      padding: "10px 15px",
      backgroundColor: "#d9534f",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
  };
  const downloadReport = () => {
    const reportContent = `
      PCOS Survey Report
      ---------------------
      Age: ${formData.age}
      Weight: ${formData.weight}
      Height: ${formData.height}
      Blood Group: ${formData.blood_group}
      Period Frequency: ${formData.period_months} months
      Gained Weight: ${formData.gained_weight ? "Yes" : "No"}
      Excessive Hair Growth: ${formData.excessive_hair_growth ? "Yes" : "No"}
      Skin Darkening: ${formData.skin_darkening ? "Yes" : "No"}
      Hair Loss: ${formData.hair_loss ? "Yes" : "No"}
      Pimples: ${formData.pimples ? "Yes" : "No"}
      Eat Fast Food: ${formData.eat_fast_food ? "Yes" : "No"}
      Regular Exercise: ${formData.reg_exercise ? "Yes" : "No"}
      Mood Swings: ${formData.mood_swings ? "Yes" : "No"}
      Regular Periods: ${formData.reg_periods ? "Yes" : "No"}
      Period Days: ${formData.period_days}
      ${prediction ? `Prediction: ${prediction}` : ""}
    `;

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PCOS_Survey_Report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>PCOS Prediction</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Age (in Years):
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Weight (in Kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Height (in Cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Blood Group (in numbers: 11: 'A+', 12: 'A-', 13: 'B+', 14: 'B-', 15:
          'O+', 16: 'O-', 17: 'AB+', 18: 'AB-'):
          <input
            type="number"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          After how many months do you get your periods?:
          <input
            type="number"
            name="period_months"
            value={formData.period_months}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        {[
          { name: "gained_weight", text: "Have you gained weight recently?" },
          {
            name: "excessive_hair_growth",
            text: "Do you have excessive body/facial hair growth?",
          },
          {
            name: "skin_darkening",
            text: "Are you noticing skin darkening recently?",
          },
          {
            name: "hair_loss",
            text: "Do you have hair loss/hair thinning/baldness?",
          },
          {
            name: "pimples",
            text: "Do you have pimples/acne on your face/jawline?",
          },
          { name: "eat_fast_food", text: "Do you eat fast food regularly?" },
          { name: "reg_exercise", text: "Do you exercise on a regular basis?" },
          { name: "mood_swings", text: "Do you experience mood swings?" },
          { name: "reg_periods", text: "Are your periods regular?" },
        ].map((field) => (
          <div key={field.name} style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name]}
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel}>{field.text}</label>
          </div>
        ))}
        <label style={styles.label}>
          How long does your period last? (in Days):
          <input
            type="number"
            name="period_days"
            value={formData.period_days}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Submit
        </button>
      </form>
      {prediction && (
        <div style={styles.prediction}>Prediction: {prediction}</div>
      )}
      <button type="button" style={styles.button} onClick={generateReport}>
        Generate Report
      </button>

      {showReport && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>
              <b>PCOS Survey Report </b>
            </h2>
            <p>
              <strong>Age:</strong> {formData.age}
            </p>
            <p>
              <strong>Weight:</strong> {formData.weight}
            </p>
            <p>
              <strong>Height:</strong> {formData.height}
            </p>
            <p>
              <strong>Blood Group:</strong> {formData.blood_group}
            </p>
            <p>
              <strong>Period Frequency:</strong> {formData.period_months} months
            </p>
            <p>
              <strong>Gained Weight:</strong>{" "}
              {formData.gained_weight ? "Yes" : "No"}
            </p>
            <p>
              <strong>Excessive Hair Growth:</strong>{" "}
              {formData.excessive_hair_growth ? "Yes" : "No"}
            </p>
            <p>
              <strong>Skin Darkening:</strong>{" "}
              {formData.skin_darkening ? "Yes" : "No"}
            </p>
            <p>
              <strong>Hair Loss:</strong> {formData.hair_loss ? "Yes" : "No"}
            </p>
            <p>
              <strong>Pimples:</strong> {formData.pimples ? "Yes" : "No"}
            </p>
            <p>
              <strong>Eat Fast Food:</strong>{" "}
              {formData.eat_fast_food ? "Yes" : "No"}
            </p>
            <p>
              <strong>Regular Exercise:</strong>{" "}
              {formData.reg_exercise ? "Yes" : "No"}
            </p>
            <p>
              <strong>Mood Swings:</strong>{" "}
              {formData.mood_swings ? "Yes" : "No"}
            </p>
            <p>
              <strong>Regular Periods:</strong>{" "}
              {formData.reg_periods ? "Yes" : "No"}
            </p>
            <p>
              <strong>Period Days:</strong> {formData.period_days}
            </p>
            {prediction && (
              <p>
                <strong>Prediction:</strong> {prediction}
              </p>
            )}
            <button onClick={closeReport} style={styles.button}>
              Close Report
            </button>
            <button onClick={downloadReport} style={styles.button}>
              Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcosSurveyForm;
