import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TabContext,
  TabPanel,
  TabList,
  TextField,
} from "@power-form-builder/ui-components";
import { RadioButtonDialog } from "../DialogInterface";
import { Element } from "../ElementInterface";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type Props = {
  id: string;
  radioButtonDataLabel: string;
  radioButtonDataValue: string;
}[];

type TabItemsProps = {
  label: React.ReactNode;
  value: string;
}[];

const RadioButtonData: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  radiobuttonValues: RadioButtonDialog;
  element: Element;
}> = ({ open, handleClose, radiobuttonValues, handleOpen, element }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  //RadioButton
  const [radioLabel, setRadioLabel] = useState("");
  const [radioOptionLabelPosition, setRadioOptionLabelPosition] = useState<
    string[]
  >([]);
  const [radioItems, setRadioItems] = useState<Props>([
    { id: uuidv4(), radioButtonDataLabel: "", radioButtonDataValue: "" },
  ]);

  const RadioOptionPositionValues = [
    { id: "1", selectDataLabel: "start", selectDataValue: "start" },
    { id: "2", selectDataLabel: "end", selectDataValue: "end" },
    { id: "3", selectDataLabel: "top", selectDataValue: "top" },
    { id: "4", selectDataLabel: "bottom", selectDataValue: "bottom" },
  ];

  const handleRadioLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadioLabel(event.target.value);
    console.log(radioLabel);
  };

  const handleRadioOptionLabelPosition = (event: any) => {
    const selectvalue = event.target.value;
    setRadioOptionLabelPosition(
      typeof selectvalue === "string" ? selectvalue.split(",") : selectvalue
    );
  };

  //Checkbox
  const [required, setRequired] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequired(event.target.checked);
  };

  const handleData = () => {
    console.log(radioItems);
    console.log(radiobuttonValues);
    radiobuttonValues.label = radioLabel;
    radiobuttonValues.options = radioOptionLabelPosition.toString();
    radiobuttonValues.required = required;
    radiobuttonValues.radioItems = radioItems;
    handleOpen();
  };

  useEffect(() => {
    setRadioLabel(element.label!);
    setRadioOptionLabelPosition([element.options!]);
    setRequired(element.required!);
    setRadioItems(element.radioItems!);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("InputFields", radioItems);
  };

  const handleChangeInput = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputFields = radioItems.map((i) => {
      if (id === i.id) {
        console.log("aaa", event.target.name, "bb", event.target.value);
        {
          event.target.name === "radioButtonDataLabel"
            ? (i["radioButtonDataLabel"] = event.target.value)
            : (i["radioButtonDataValue"] = event.target.value);
        }
      }
      return i;
    });

    setRadioItems(newInputFields);
  };

  const handleAddFields = () => {
    setRadioItems([
      ...radioItems,
      { id: uuidv4(), radioButtonDataLabel: "", radioButtonDataValue: "" },
    ]);
    console.log(radioItems);
  };

  const handleRemoveFields = (id: string) => {
    const values = [...radioItems];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setRadioItems(values);
  };

  const tabItems: TabItemsProps = [
    { label: "Display", value: "1" },
    { label: "Data", value: "2" },
    { label: "Validation", value: "3" },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle title="RadioButton Details" />
      <DialogContent>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} tabItems={tabItems}></TabList>
          </Box>
          <TabPanel value="1">
            <TextField
              label="Label"
              required={true}
              value={radioLabel}
              onChange={handleRadioLabelChange}
            />
            <br />
            <br />
            <Select
              label="Options Label Position"
              placeholder=""
              menuItems={RadioOptionPositionValues}
              value={radioOptionLabelPosition}
              size="medium"
              required={false}
              multiple={false}
              onChange={handleRadioOptionLabelPosition}
              width={225}
            />
          </TabPanel>
          <TabPanel value="2">
            <form onSubmit={handleSubmit}>
              {radioItems.map((item) => (
                <div>
                  <br />
                  <TextField
                    label="RadioButtonDataLabel"
                    name="radioButtonDataLabel"
                    required={true}
                    placeholder=""
                    value={item.radioButtonDataLabel}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      handleChangeInput(item.id, e)
                    }
                  />
                  &nbsp;
                  <TextField
                    label="RadioButtonValue"
                    required={true}
                    placeholder=""
                    name="radioButtonDataValue"
                    value={item.radioButtonDataValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      handleChangeInput(item.id, e)
                    }
                  />
                  {radioItems.length !== 1 ? (
                    <span
                      className="icon"
                      onClick={() => handleRemoveFields(item.id)}
                    >
                      <RemoveCircleIcon />
                    </span>
                  ) : (
                    <></>
                  )}
                  <span className="icon" onClick={handleAddFields}>
                    <AddCircleIcon />
                  </span>
                </div>
              ))}
              <br />
              <Button label="Done" color="secondary" size="small" />
            </form>
          </TabPanel>
          <TabPanel value="3">
            <Checkbox
              label="Required"
              checked={required}
              required={true}
              onChange={handleCheckboxChange}
            />
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions>
        <Button
          label="Cancel"
          color="success"
          onClick={handleClose}
          size="medium"
        />
        <Button
          label="Save"
          color="success"
          onClick={handleData}
          size="medium"
        />
      </DialogActions>
    </Dialog>
  );
};

export default RadioButtonData;
