
          {renderData(otherFields)}
          {hideTimeEntryForm ? null : (
            <TimeEntryForm
              cardId={cardId}
              // ToggleHideTimeEntryForm={ToggleHideTimeEntryForm}
            />
          )}
          <CustomButton
            addbutton
            onClick={() => ToggleHideTimeEntryForm(false)}
          >
            Add Time Field
          </CustomButton>
          {hideCustomField ? null : renderAddField}
          {
            <CustomButton
              addbutton
              onClick={() => toggleHideCustomField(false)}
            >
              Add Field
            </CustomButton>
          }
      </CardDetailPageContainer>
        {!hideConfirmBox ? (
          <ConfirmDeleteContainer>
            <FormInput
              type="text"
              onChange={(e) => setConfirmName(e.target.value)}
              label={"Enter Client Name"}
              value={confirmName}
            />
            <InteractionsContainer>
              <CustomButton deletebutton onClick={handleConfirmDelete}>
                Confirm
              </CustomButton>
              <CustomButton
                cancelbutton
                onClick={() => setHideConfirmBox(true)}
              >
                Cancel
              </CustomButton>
            </InteractionsContainer>
          </ConfirmDeleteContainer>
        ) : (
          <InteractionsContainer>
            <CustomButton deletebutton onClick={handleDeleteButtonClick}>
              DELETE
            </CustomButton>
            <CustomButton editbutton onClick={handleEditButtonClick}>
              EDIT
            </CustomButton>
          </InteractionsContainer>
        )}
    );
  }

    // const [field, setField] = useState({
  //   name: "",
  //   type: "",
  //   value: "",
  // });

  const handleDeleteButtonClick = () => {
    setHideConfirmBox(false);
  };

  const handleConfirmDelete = () => {
    if (confirmName === card.profile.name) {
      dispatch(deleteCard(cardId));
      history.push("/");
    } else {
      window.alert("Unmatching name, delete failed");
    }
  };

  const handleEditButtonClick = () => {
    console.log("edit needed");
  };

  // const handleAddFieldClicked = () => {
  //   dispatch(addField({ field, cardId }));
  //   toggleHideCustomField(true);
  //   setField({
  //     name: "",
  //     type: "",
  //     value: "",
  //   });
  // };

  
  const history = useHistory();

  const [hideConfirmBox, setHideConfirmBox] = useState(true);
  const [confirmName, setConfirmName] = useState("");