import "./App.css";
import { DataTable } from "./components/DataTable/DataTable.tsx";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createItem } from "./api/endpoints.ts";
import { Box, Button, Modal } from "@mui/material";
import {
  CreateForm,
  type FormData,
} from "./components/CreateForm/CreateForm.tsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddItem = async (data: FormData) => {
    try {
      await createItem(data);
      setModalOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    } catch (error) {
      console.info("Ошибка при создании: " + error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 2 }}
      >
        Добавить элемент
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <CreateForm
            onSubmit={handleAddItem}
            onCancel={() => setModalOpen(false)}
          />
        </Box>
      </Modal>

      <DataTable />
    </>
  );
}

export default App;
