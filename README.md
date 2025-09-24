# Form2JSON

Form2JSON is a **dynamic JSON form builder** built with **React** and **Tailwind CSS**.  
It allows users to create custom forms on the fly, define input field types (string, number, boolean, date, array, object), fill in values, and **export the data as a JSON file**.  
Supports **nested objects**, **arrays**, and repeatable inputs for maximum flexibility.

---

## ✨ Features

- 🔹 Create dynamic forms with custom field labels and types.  
- 🔹 Supported field types: `string`, `number`, `boolean`, `date`, `array`, `object`.  
- 🔹 Add nested fields for objects.  
- 🔹 Add multiple values in arrays.  
- 🔹 Repeatable objects (e.g., multiple cars, addresses, etc.).  
- 🔹 Live JSON preview while filling the form.  
- 🔹 Download the collected data as a `.json` file.  
- 🔹 Clean UI with Tailwind CSS.  

---

## 📸 Demo Screenshot

> Example of form with objects and arrays  

![Form2JSON Screenshot](https://github.com/user-attachments/assets/9647ba46-d1f2-4228-9210-a93299dd9973)
![Form2JSON Screenshot](https://github.com/user-attachments/assets/e766431d-eb57-4526-a74b-18917031b39d)
![Form2JSON Screenshot](https://github.com/user-attachments/assets/169637bf-b087-4eb8-8d29-9c75cff70bc0)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Form2JSON.git
cd Form2JSON

### 2. Install dependencies
```bash
npm install

### 3. Run the project
```bash
npm run dev

Then open http://localhost:5173
 in your browser.

🛠️ Tech Stack

React – UI library
Vite – Fast build tool
Tailwind CSS – Styling
JavaScript (ES6+)

📂 Project Structure
Form2JSON/
│── src/
│   ├── App.jsx
│   ├── DynamicForm.jsx
│   ├── index.css
│   └── main.jsx
│── package.json
│── README.md
│── vite.config.js

📥 Usage

Enter the number of inputs you want.
Define labels and types for each input field.
For objects → add sub-fields.
For arrays → add multiple items.
For repeatable objects → add multiple object instances.
Fill in the form.
Preview JSON in real-time.
Click Download JSON to save the file.

🖼️ Example JSON Output
{
  "name": "Alice",
  "age": 25,
  "isStudent": false,
  "skills": ["React", "Node.js"],
  "cars": [
    { "model": "BMW", "price": 50000 },
    { "model": "Audi", "price": 60000 }
  ]
}

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a pull request or issue.
