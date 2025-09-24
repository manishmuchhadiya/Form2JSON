import { useState } from "react";

export default function DynamicForm() {
  const [numInputs, setNumInputs] = useState(0);
  const [fields, setFields] = useState([]); // { label, type, subFields? }
  const [values, setValues] = useState({});
  const [step, setStep] = useState(1);

  // Handle label change
  const handleLabelChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].label = value;
    setFields(newFields);
  };

  // Handle type change
  const handleTypeChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].type = value;

    // If it's an object, initialize subFields
    if (value === "object" && !newFields[index].subFields) {
      newFields[index].subFields = [];
    }

    setFields(newFields);
  };

  // Add subfield inside object
  const addSubField = (parentIndex) => {
    const newFields = [...fields];
    newFields[parentIndex].subFields.push({ label: "", type: "string" });
    setFields(newFields);
  };

  const handleSubLabelChange = (parentIndex, subIndex, value) => {
    const newFields = [...fields];
    newFields[parentIndex].subFields[subIndex].label = value;
    setFields(newFields);
  };

  const handleSubTypeChange = (parentIndex, subIndex, value) => {
    const newFields = [...fields];
    newFields[parentIndex].subFields[subIndex].type = value;
    setFields(newFields);
  };

  // Parse value into correct type
  const parseValue = (type, value) => {
    switch (type) {
      case "number":
        return value === "" ? "" : Number(value);
      case "boolean":
        return value === "true";
      case "date":
        return value;
      default:
        return value;
    }
  };

  // Handle array items
  const addArrayItem = (label, parent = null) => {
    const arr = parent ? values[parent]?.[label] || [] : values[label] || [];
    arr.push("");
    if (parent) {
      setValues({
        ...values,
        [parent]: { ...values[parent], [label]: arr },
      });
    } else {
      setValues({ ...values, [label]: arr });
    }
  };

  // Handle repeatable objects
  const addObjectItem = (field) => {
    const objs = values[field.label] || [];
    const emptyObj = {};
    field.subFields.forEach((sub) => {
      emptyObj[sub.label] = sub.type === "number" ? 0 : "";
    });
    setValues({ ...values, [field.label]: [...objs, emptyObj] });
  };

  // Download JSON file
  const downloadJSON = () => {
    const dataStr = JSON.stringify(values, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form-data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-10">Smart Form to JSON Converter</h1>
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl items-center justify-center">
        {/* STEP 1: Number of inputs */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Step 1: Select number of inputs
            </h2>
            <input
              type="number"
              min="1"
              className="border p-2 rounded w-full"
              value={numInputs}
              onChange={(e) => setNumInputs(Number(e.target.value))}
            />
            <button
              onClick={() => {
                setFields(
                  Array(numInputs)
                    .fill({})
                    .map(() => ({ label: "", type: "string" }))
                );
                setStep(2);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2: Define fields */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 2: Define inputs</h2>
            {fields.map((field, index) => (
              <div key={index} className="border p-3 rounded space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Label for input ${index + 1}`}
                    className="border p-2 rounded flex-1"
                    value={field.label}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                  />
                  <select
                    className="border p-2 rounded"
                    value={field.type}
                    onChange={(e) => handleTypeChange(index, e.target.value)}
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="date">Date</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                  </select>
                </div>

                {/* Sub-fields if object */}
                {field.type === "object" && (
                  <div className="ml-4 space-y-2">
                    <p className="font-medium">Sub-fields for {field.label}</p>
                    {field.subFields?.map((sub, subIndex) => (
                      <div key={subIndex} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Subfield ${subIndex + 1}`}
                          className="border p-2 rounded flex-1"
                          value={sub.label}
                          onChange={(e) =>
                            handleSubLabelChange(
                              index,
                              subIndex,
                              e.target.value
                            )
                          }
                        />
                        <select
                          className="border p-2 rounded"
                          value={sub.type}
                          onChange={(e) =>
                            handleSubTypeChange(index, subIndex, e.target.value)
                          }
                        >
                          <option value="string">String</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="date">Date</option>
                          <option value="array">Array</option>
                        </select>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addSubField(index)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      + Add Subfield
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => setStep(3)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 3: Enter values */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 3: Enter values</h2>
            {fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="font-medium">{field.label}:</label>

                {/* Boolean input */}
                {field.type === "boolean" && (
                  <select
                    className="border p-2 rounded w-full"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [field.label]: parseValue(field.type, e.target.value),
                      })
                    }
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                )}

                {/* Array input */}
                {field.type === "array" && (
                  <div className="space-y-2">
                    {(values[field.label] || []).map((item, idx) => (
                      <input
                        key={idx}
                        type="text"
                        className="border p-2 rounded w-full"
                        placeholder={`Item ${idx + 1}`}
                        value={item}
                        onChange={(e) => {
                          const arr = [...(values[field.label] || [])];
                          arr[idx] = parseValue(field.type, e.target.value);
                          setValues({ ...values, [field.label]: arr });
                        }}
                      />
                    ))}
                    <button
                      onClick={() => addArrayItem(field.label)}
                      className="bg-gray-200 px-3 py-1 rounded"
                      type="button"
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                {/* Repeatable Object input */}
                {field.type === "object" && (
                  <div className="ml-4 space-y-4">
                    {(values[field.label] || []).map((obj, objIdx) => (
                      <div key={objIdx} className="border p-3 rounded">
                        <p className="font-medium">
                          {field.label} #{objIdx + 1}
                        </p>
                        {field.subFields?.map((sub, subIndex) => (
                          <div key={subIndex} className="mb-2">
                            <label>{sub.label}:</label>
                            <input
                              type={sub.type === "string" ? "text" : sub.type}
                              className="border p-2 rounded w-full"
                              onChange={(e) => {
                                const parsed = parseValue(
                                  sub.type,
                                  e.target.value
                                );
                                const objs = [...(values[field.label] || [])];
                                objs[objIdx] = {
                                  ...objs[objIdx],
                                  [sub.label]: parsed,
                                };
                                setValues({ ...values, [field.label]: objs });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addObjectItem(field)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      + Add {field.label}
                    </button>
                  </div>
                )}

                {/* Default: string, number, date */}
                {field.type !== "boolean" &&
                  field.type !== "array" &&
                  field.type !== "object" && (
                    <input
                      type={field.type === "string" ? "text" : field.type}
                      className="border p-2 rounded w-full"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [field.label]: parseValue(field.type, e.target.value),
                        })
                      }
                    />
                  )}
              </div>
            ))}

            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold">Collected Data:</h3>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>

            <button
              onClick={downloadJSON}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Download JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
