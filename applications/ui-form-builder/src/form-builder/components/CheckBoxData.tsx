import React, { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  TabContext,
  TabPanel,
  TabList,
} from "@power-form-builder/ui-components";
import { CheckboxDiaglog } from "../DialogInterface";
import { Element } from "../ElementInterface";

type TabItemsProps = {
  label: React.ReactNode;
  value: string;
}[];

const CheckboxData: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  checkBoxValues: CheckboxDiaglog;
  element: Element;
}> = ({ open, handleClose, checkBoxValues, handleOpen, element }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
    console.log(value);
  };

  //Checkbox
  const [checkboxLabel, setCheckboxLabel] = useState("");
  const [defaultValue, setDefaultValue] = useState(false);
  const [errorLabel, setErrorLabel] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxLabel(event.target.value);
    console.log(checkboxLabel);
  };

  const handleDefaultValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultValue(event.target.checked);
  };

  const handleErrorLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorLabel(event.target.value);
  };

  //Checkbox
  const [required, setRequired] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequired(event.target.checked);
  };

  const handleData = () => {
    console.log(checkboxLabel);
    checkBoxValues.label = checkboxLabel;
    checkBoxValues.default = defaultValue;
    checkBoxValues.error = errorLabel;
    checkBoxValues.required = required;
    console.log(checkBoxValues);
    handleOpen();
  };

  useEffect(() => {
    console.log("Checkobx", element);
    setCheckboxLabel(element.label!);
    setDefaultValue(element.default!);
    setRequired(element.required!);
    setErrorLabel(element.error!);
    console.log("Checkobx", checkboxLabel, defaultValue, errorLabel);
  }, []);

  const tabItems: TabItemsProps = [
    { label: "Display", value: "1" },
    { label: "Validation", value: "2" },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle title="Checkbox Details" />
      <DialogContent>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} tabItems={tabItems}></TabList>
          </Box>
          <TabPanel value="1">
            <TextField
              label="Label"
              required={true}
              value={checkboxLabel}
              onChange={handleTextChange}
            />
            <br />
            <br />
            <Checkbox
              label="Default Value"
              required={true}
              checked={defaultValue}
              onChange={handleDefaultValue}
            />
          </TabPanel>
          <TabPanel value="2">
            <Checkbox
              label="Required"
              checked={required}
              defaultChecked={defaultValue}
              required={true}
              onChange={handleCheckboxChange}
            />
            <br />
            <br />
            <TextField
              label="Error Label"
              required={true}
              placeholder="Enter Error Label"
              value={errorLabel}
              onChange={handleErrorLabel}
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

export default CheckboxData;
