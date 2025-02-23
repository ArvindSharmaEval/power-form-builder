import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Element } from "./ElementInterface";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaEdit } from "react-icons/fa";

import "./styles.css";

import {
  Button,
  Checkbox,
  RadioGroup,
  Select,
  TextFieldSelect,
  TextareaAutosize,
  TextField,
  Tabs,
  Grid,
  GridItem,
} from "@power-form-builder/ui-components";
import TextFieldData from "./components/TextFieldData";
import {
  ButtonDialog,
  CheckboxDiaglog,
  ColumnDialog,
  ColumnItemsDialog,
  RadioButtonDialog,
  SelectDiaglog,
  TabsDialog,
  TextAreaDiaglog,
  TextFieldDiaglog,
} from "./DialogInterface";
import TextAreaData from "./components/TextAreaData";
import CheckboxData from "./components/CheckboxData";
import SelectData from "./components/SelectData";
import ButtonData from "./components/ButtonData";
import RadioButtonData from "./components/RadioButtonData";
import TabsData from "./components/TabsData";
import ColumnData from "./components/ColumData";

type Props = {
  id: string;
  selectDataLabel: string;
  selectDataValue: string;
}[];

type TabProps = {
  id: string;
  tabsDataLabel: string;
  tabsDataValue: string;
  tabComponents: Element[];
}[];

type ColumnItemsProps = {
  id: string;
  label: string;
  columnDataSize: string;
  columnDataWidth: number;
  columnComponents: Element[];
}[];

type RadioProps = {
  id: string;
  radioButtonDataLabel: string;
  radioButtonDataValue: string;
}[];

const SingleElement: React.FC<{
  show: boolean;
  index: number;
  element: Element;
  elements: Array<Element>;
  setElements: React.Dispatch<React.SetStateAction<Array<Element>>>;
  tabElements: Array<Element>;
  setTabElements: React.Dispatch<React.SetStateAction<Array<Element>>>;
  columnElements: Array<Element>;
  setColumnElements: React.Dispatch<React.SetStateAction<Array<Element>>>;
  column1Elements: Array<Element>;
  setColumn1Elements: React.Dispatch<React.SetStateAction<Array<Element>>>;
}> = ({
  show,
  index,
  element,
  elements,
  setElements,
  tabElements,
  setTabElements,
  columnElements,
  setColumnElements,
  column1Elements,
  setColumn1Elements,
}) => {
  const textFieldValues: TextFieldDiaglog = {
    label: "TextField",
    required: false,
    placeholder: "Enter TextField",
    minLength: 0,
    maxLength: 0,
  };

  const passwordValues: TextFieldDiaglog = {
    label: "Password",
    required: false,
    placeholder: "Enter Password",
    minLength: 0,
    maxLength: 0,
  };

  const emailValues: TextFieldDiaglog = {
    label: "Email",
    required: false,
    placeholder: "Enter Email",
    minLength: 0,
    maxLength: 0,
  };

  const textAreaValues: TextFieldDiaglog = {
    label: "TextArea",
    required: false,
    placeholder: "Enter TextArea",
    minLength: 0,
    maxLength: 0,
    rows: 0,
  };

  const checkBoxValues: CheckboxDiaglog = {
    label: "Checkbox",
    required: false,
    default: false,
    checked: false,
    error: "",
  };

  const buttonValues: ButtonDialog = {
    label: "Button",
    theme: "secondary",
    size: "large",
  };

  const menuItemsData: Props = [
    { id: "Select1", selectDataLabel: "Select1", selectDataValue: "Select1" },
  ];

  const tabsItemsData: TabProps = [
    {
      id: "Tab1",
      tabsDataLabel: "Tab1",
      tabsDataValue: "Tab1",
      tabComponents: [
        {
          id: 1011,
          element: "Tabs",
          label: "Ths",
        },
      ],
    },
    {
      id: "Tab2",
      tabsDataLabel: "Tab2",
      tabsDataValue: "Tab2",
      tabComponents: [
        {
          id: 1014,
          element: "Tabs",
          label: "Ths",
        },
      ],
    },
  ];

  const columnItemsData: ColumnItemsProps = [
    {
      id: "1989",
      label: "Column1",
      columnDataSize: "md",
      columnDataWidth: 220,
      columnComponents: [
        {
          id: 1012,
          element: "Column",
          label: "Ths",
        },
      ],
    },
  ];

  const finalColumnItemsData: ColumnItemsProps = [
    {
      id: "1989",
      label: "Column1",
      columnDataSize: "md",
      columnDataWidth: 220,
      columnComponents: [
        {
          id: 1012,
          element: "Column",
          label: "Ths",
        },
      ],
    },
    {
      id: "1990",
      label: "Column2",
      columnDataSize: "md",
      columnDataWidth: 220,
      columnComponents: [
        {
          id: 1012,
          element: "Column",
          label: "Ths",
        },
      ],
    },
  ];

  const selectValues: SelectDiaglog = {
    label: "Select",
    placeholder: "Select the option",
    multipleValues: false,
    required: false,
    size: "medium",
    width: 220,
    menuItems: menuItemsData,
  };

  const tabValues: TabsDialog = {
    label: "",
    tabItems: tabsItemsData,
  };

  const radioItemsData: RadioProps = [
    {
      id: "radio1",
      radioButtonDataLabel: "Male",
      radioButtonDataValue: "Male",
    },
    {
      id: "radio2",
      radioButtonDataLabel: "Female",
      radioButtonDataValue: "Female",
    },
  ];

  const radiobuttonValues: RadioButtonDialog = {
    label: "RadioButton",
    options: "",
    radioItems: radioItemsData,
    required: false,
  };

  const columnValues: ColumnDialog = {
    label: "Column",
    columnItems: columnItemsData,
  };

  const column1Values: ColumnItemsProps = [
    {
      id: "1989",
      label: "Column1",
      columnDataSize: "md",
      columnDataWidth: 220,
      columnComponents: [
        {
          id: 1011,
          element: "Column",
          label: "Ths",
        },
      ],
    },
  ];

  // const column2Values: ColumnItemsDialog = [
  //   {
  //     id: "1990",
  //     label: "Column1",
  //     columnDataSize: ["md"],
  //     columnDataWidth: 220,
  //     columnComponents: [
  //       {
  //         id: 1012,
  //         element: "Column",
  //         label: "Ths",
  //       },
  //     ],
  //   },
  // ];

  const [edit, setEdit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleDelete = (id: number) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  //TextField
  const [open, setOpen] = React.useState(element.show);

  const handleClickOpen = () => {
    console.log("Opened");
    console.log(open);
    setOpen(!open);
  };

  const handleOpen = () => {
    console.log(element);
    let col = false;
    setOpen(!open);

    if (element.element === "Button") {
      console.log(buttonValues);
      console.log("JSON", JSON.stringify(buttonValues));
      element.label = buttonValues.label;
      element.theme = buttonValues.theme.toString();
      element.size = buttonValues.size.toString();
    } else if (element.element === "TextField") {
      console.log(textFieldValues.label);
      console.log("JSON", JSON.stringify(textFieldValues));
      element.label = textFieldValues.label;
      element.placeholder = textFieldValues.placeholder;
      element.maxLength = textFieldValues.maxLength;
      element.minLength = textFieldValues.minLength;
      element.required = textFieldValues.required;
    } else if (element.element === "Password") {
      console.log(textFieldValues.label);
      console.log("JSON", JSON.stringify(textFieldValues));
      element.label = passwordValues.label;
      element.placeholder = passwordValues.placeholder;
      element.maxLength = passwordValues.maxLength;
      element.minLength = passwordValues.minLength;
      element.required = passwordValues.required;
    } else if (element.element === "Email") {
      console.log(textFieldValues.label);
      console.log("JSON", JSON.stringify(textFieldValues));
      element.label = emailValues.label;
      element.placeholder = emailValues.placeholder;
      element.maxLength = emailValues.maxLength;
      element.minLength = emailValues.minLength;
      element.required = emailValues.required;
    } else if (element.element === "TextArea") {
      console.log(textAreaValues);
      console.log("JSON", JSON.stringify(textAreaValues));
      element.label = textAreaValues.label;
      element.placeholder = textAreaValues.placeholder;
      element.rows = textAreaValues.rows;
      element.maxLength = textAreaValues.maxLength;
      element.minLength = textAreaValues.minLength;
      element.required = textAreaValues.required;
    } else if (element.element === "Select") {
      console.log(selectValues);
      console.log("JSON", JSON.stringify(selectValues));
      element.label = selectValues.label;
      element.placeholder = selectValues.placeholder;
      element.multipleValues = selectValues.multipleValues;
      element.menuItems = selectValues.menuItems;
      element.required = selectValues.required;
      element.size = selectValues.size.toString();
      element.width = selectValues.width;
    } else if (element.element === "Checkbox") {
      console.log(checkBoxValues);
      console.log("JSON", JSON.stringify(checkBoxValues));
      element.label = checkBoxValues.label;
      element.default = checkBoxValues.default;
      element.error = checkBoxValues.error;
      element.required = checkBoxValues.required;
    } else if (element.element === "RadioButton") {
      console.log(radiobuttonValues);
      console.log("JSON", JSON.stringify(radiobuttonValues));
      element.label = radiobuttonValues.label;
      element.options = radiobuttonValues.options;
      element.radioItems = radiobuttonValues.radioItems;
      element.required = radiobuttonValues.required;
    } else if (element.element === "Tabs") {
      console.log(tabValues);
      console.log("JSON", JSON.stringify(tabValues));
      element.label = tabValues.label;
      tabValues.tabItems.map((item, index) => (
        <>if(index === 0){(item.tabComponents = tabElements)}</>
      ));
      console.log(tabValues);
      element.tabItems = tabValues.tabItems;
    } else if (element.element === "Column") {
      // columnValues.columnItems.map((item, index) => (
      //   <>item.columnComponents = columnElements</>
      // ));
      element.label = columnValues.label;
      element.columnItems = columnValues.columnItems;
      col = true;
    }
    element.show = false;
    if (col) {
      console.log(element.columnItems);
      console.log("ColumnValues", columnValues);
      console.log("Column1Elements", columnElements);
      console.log("Column2Elements", column1Elements);
      console.log("JSON", JSON.stringify(columnValues));

      // element.columnItems?.map((item, index) => (
      //   <>
      //     if(item.label === "Column1")
      //     {(item.columnComponents = columnElements)}
      //     else{(item.columnComponents = column1Elements)}
      //   </>
      // ));

      finalColumnItemsData.map((item, index) =>
        item.label === "Column1"
          ? (item.columnComponents = columnElements)
          : (item.columnComponents = column1Elements)
      );

      element.columnItems = finalColumnItemsData;

      console.log("Final", finalColumnItemsData);
      console.log("Element Column", element.columnItems);
    }
  };

  const handleClose = () => {
    console.log(element.element);
    console.log(element);
    if (element.show) {
      console.log(element.show);
      handleDelete(element.id);
    }
    setOpen(!open);
    if (element.element === "Button") {
      console.log(buttonValues);
      console.log("JSON", JSON.stringify(buttonValues));
    } else if (element.element === "TextField") {
      console.log(textFieldValues.label);
      console.log("JSON", JSON.stringify(textFieldValues));
    } else if (element.element === "Password") {
      console.log(passwordValues.label);
      console.log("JSON", JSON.stringify(passwordValues));
    } else if (element.element === "Email") {
      console.log(emailValues.label);
      console.log("JSON", JSON.stringify(emailValues));
    } else if (element.element === "TextArea") {
      console.log(textAreaValues);
      console.log("JSON", JSON.stringify(textAreaValues));
    } else if (element.element === "Select") {
      console.log(selectValues);
      console.log("JSON", JSON.stringify(selectValues));
    } else if (element.element === "Checkbox") {
      console.log(checkBoxValues);
      console.log("JSON", JSON.stringify(checkBoxValues));
    } else if (element.element === "RadioButton") {
      console.log(radiobuttonValues);
      console.log("JSON", JSON.stringify(radiobuttonValues));
    } else if (element.element === "Column") {
      console.log(columnValues);
      console.log("JSON", JSON.stringify(columnValues));
    } else if (element.element === "Tabs") {
      console.log(tabValues);
      console.log("JSON", JSON.stringify(tabValues));
    }
    setEdit(!edit);
  };

  // Final TextField
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
    console.log(textFieldValue);
  };

  // Final Password
  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    console.log(passwordValue);
  };

  // Final Email
  const [emailValue, setEmailValue] = useState("");

  const handleEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
    console.log(emailValue);
  };

  //Final TextArea
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextAreaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextAreaValue(event.target.value);
    console.log(textAreaValue);
  };

  //Final Checkbox
  const [checked, setChecked] = useState(false);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  //Final Select
  const [selectData, setSelectData] = useState<string[]>([]);

  const handleSelectData = (event: any) => {
    const selectvalue = event.target.value;
    setSelectData(
      typeof selectvalue === "string" ? selectvalue.split(",") : selectvalue
    );
  };

  //Final Button
  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button Clicked");
  };

  //Final
  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const [textFieldStatus, setTextFieldStatus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Draggable draggableId={element.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`elements__single ${snapshot.isDragging ? "drag" : ""}`}
          onMouseLeave={() => setShowDropdown(false)}
          onMouseOver={() => setShowDropdown(true)}
          // style={{ width: "166px" }}
        >
          <>
            {element.element === "TextField" ? (
              <>
                <TextFieldData
                  open={open!}
                  handleClose={handleClose}
                  textFieldValues={textFieldValues}
                  handleOpen={handleOpen}
                  element={element}
                  textFieldStatus={textFieldStatus}
                />
                <TextField
                  label={textFieldValues.label}
                  required={textFieldValues.required}
                  placeholder={textFieldValues.placeholder}
                  value={textFieldValue}
                  onChange={handleTextFieldValue}
                  minLength={textFieldValues.minLength}
                  maxLength={textFieldValues.maxLength}
                  // type="password"
                ></TextField>
              </>
            ) : element.element === "TextArea" ? (
              <>
                <TextFieldData
                  open={open!}
                  handleClose={handleClose}
                  textFieldValues={textAreaValues}
                  handleOpen={handleOpen}
                  element={element}
                  textFieldStatus={textFieldStatus}
                ></TextFieldData>

                <TextField
                  label={textAreaValues.label}
                  required={textAreaValues.required}
                  placeholder={textAreaValues.placeholder}
                  value={textAreaValue}
                  onChange={handleTextAreaValue}
                  rows={textAreaValues.rows}
                  minLength={textAreaValues.minLength}
                  maxLength={textAreaValues.maxLength}
                  multiline={true}
                ></TextField>
              </>
            ) : element.element === "Password" ? (
              <>
                <TextFieldData
                  open={open!}
                  element={element}
                  handleClose={handleClose}
                  textFieldValues={passwordValues}
                  handleOpen={handleOpen}
                  textFieldStatus={textFieldStatus}
                />

                <TextField
                  label={passwordValues.label}
                  required={passwordValues.required}
                  placeholder={passwordValues.placeholder}
                  value={passwordValue}
                  onChange={handlePasswordValue}
                  minLength={passwordValues.minLength}
                  maxLength={passwordValues.maxLength}
                  type="password"
                ></TextField>
              </>
            ) : element.element === "Email" ? (
              <>
                <TextFieldData
                  open={open!}
                  element={element}
                  handleClose={handleClose}
                  textFieldValues={emailValues}
                  handleOpen={handleOpen}
                  textFieldStatus={textFieldStatus}
                />

                <TextField
                  label={emailValues.label}
                  required={emailValues.required}
                  placeholder={emailValues.placeholder}
                  value={emailValue}
                  onChange={handleEmailValue}
                  minLength={emailValues.minLength}
                  maxLength={emailValues.maxLength}
                  type="email"
                ></TextField>
              </>
            ) : element.element === "Checkbox" ? (
              <>
                <CheckboxData
                  open={open!}
                  handleClose={handleClose}
                  checkBoxValues={checkBoxValues}
                  handleOpen={handleOpen}
                  element={element}
                ></CheckboxData>

                <Checkbox
                  label={checkBoxValues.label}
                  required={checkBoxValues.required}
                  checked={checkBoxValues.default}
                  onChange={handleCheck}
                />
              </>
            ) : element.element === "Select" ? (
              <>
                <SelectData
                  open={open!}
                  handleClose={handleClose}
                  selectValues={selectValues}
                  handleOpen={handleOpen}
                  element={element}
                ></SelectData>

                <Select
                  label={selectValues.label}
                  placeholder={selectValues.placeholder}
                  menuItems={menuItemsData}
                  multiple={selectValues.multipleValues}
                  value={selectData}
                  onChange={handleSelectData}
                  size={selectValues.size === "small" ? "small" : "medium"}
                  required={selectValues.required}
                  width={selectValues.width}
                />
              </>
            ) : element.element === "Button" ? (
              <>
                <ButtonData
                  open={open!}
                  handleClose={handleClose}
                  buttonValues={buttonValues}
                  handleOpen={handleOpen}
                  element={element}
                ></ButtonData>

                <Button
                  label={buttonValues.label}
                  color={
                    buttonValues.size === "primary"
                      ? "primary"
                      : buttonValues.size === "secondary"
                      ? "secondary"
                      : buttonValues.size === "info"
                      ? "info"
                      : buttonValues.size === "success"
                      ? "success"
                      : buttonValues.size === "warning"
                      ? "warning"
                      : buttonValues.size === "error"
                      ? "error"
                      : "inherit"
                  }
                  size={
                    buttonValues.size === "small"
                      ? "small"
                      : buttonValues.size === "medium"
                      ? "medium"
                      : "large"
                  }
                  onClick={handleButton}
                />
              </>
            ) : element.element === "RadioButton" ? (
              <>
                <RadioButtonData
                  open={open!}
                  handleClose={handleClose}
                  radiobuttonValues={radiobuttonValues}
                  handleOpen={handleOpen}
                  element={element}
                />

                <RadioGroup
                  label={radiobuttonValues.label}
                  options={
                    radiobuttonValues.options === "top"
                      ? "top"
                      : radiobuttonValues.options === "bottom"
                      ? "bottom"
                      : radiobuttonValues.options === "start"
                      ? "start"
                      : "end"
                  }
                  radioItems={radiobuttonValues.radioItems}
                  required={radiobuttonValues.required}
                  value={radioValue}
                  onChange={handleRadioChange}
                />
              </>
            ) : element.element === "Column" ? (
              <>
                <ColumnData
                  open={open!}
                  handleClose={handleClose}
                  columnValues={columnValues}
                  handleOpen={handleOpen}
                  element={element}
                />
                <Grid spacing={10}>
                  <GridItem md={6}>
                    <>
                      <div className="elements__single_column">
                        <Droppable droppableId="columnDroppableId">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`elements  ${
                                snapshot.isDraggingOver
                                  ? "dragcomplete"
                                  : "remove"
                              }`}
                            >
                              {columnElements?.map((element, index) => (
                                <>
                                  <SingleElement
                                    show={show}
                                    index={index}
                                    elements={columnElements}
                                    element={element}
                                    key={element.id}
                                    setElements={setColumnElements}
                                    tabElements={tabElements}
                                    setTabElements={setTabElements}
                                    columnElements={columnElements}
                                    setColumnElements={setColumnElements}
                                    column1Elements={column1Elements}
                                    setColumn1Elements={setColumn1Elements}
                                  />
                                </>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </>
                  </GridItem>
                  <GridItem md={6}>
                    <Droppable droppableId="column1DroppableId">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`elements  ${
                            snapshot.isDraggingOver ? "dragcomplete" : "remove"
                          }`}
                        >
                          {column1Elements?.map((element, index) => (
                            <>
                              <SingleElement
                                show={show}
                                index={index}
                                elements={column1Elements}
                                element={element}
                                key={element.id}
                                setElements={setColumn1Elements}
                                tabElements={tabElements}
                                setTabElements={setColumn1Elements}
                                columnElements={columnElements}
                                setColumnElements={setColumnElements}
                                column1Elements={column1Elements}
                                setColumn1Elements={setColumn1Elements}
                              />
                            </>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </GridItem>
                </Grid>
              </>
            ) : element.element === "Tabs" ? (
              <>
                <TabsData
                  open={open!}
                  handleClose={handleClose}
                  tabValues={tabValues}
                  handleOpen={handleOpen}
                  element={element}
                ></TabsData>
                <Tabs tabItems={tabValues.tabItems}>
                  <Droppable droppableId="tabsDroppableId">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`elements  ${
                          snapshot.isDraggingOver ? "dragcomplete" : "remove"
                        }`}
                      >
                        {tabElements?.map((element, index) => (
                          <>
                            <SingleElement
                              show={show}
                              index={index}
                              elements={tabElements}
                              element={element}
                              key={element.id}
                              setElements={setTabElements}
                              tabElements={tabElements}
                              setTabElements={setTabElements}
                              columnElements={columnElements}
                              setColumnElements={setColumnElements}
                              column1Elements={column1Elements}
                              setColumn1Elements={setColumn1Elements}
                            />
                          </>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Tabs>
              </>
            ) : (
              <>
                <h1>Not Valid Component</h1>
              </>
            )}
            {showDropdown ? (
              <>
                <span
                  className="icon"
                  onClick={() => {
                    setEdit(!edit);
                    handleClickOpen();
                  }}
                >
                  {edit ? <AiFillEdit /> : <FaEdit />}
                </span>

                <span className="icon" onClick={() => handleDelete(element.id)}>
                  <AiFillDelete />
                </span>
              </>
            ) : (
              <></>
            )}
          </>
        </form>
      )}
    </Draggable>
  );
};

export default SingleElement;
