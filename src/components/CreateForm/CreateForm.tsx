import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export type FormData = {
  title: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
};

interface CreateFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const categories = [
  "Смартфоны",
  "Ноутбуки",
  "Аудио",
  "Гаджеты",
  "Планшеты",
  "Фототехника",
  "Игровые консоли",
  "Мониторы",
  "Накопители",
  "Транспорт",
];

export const CreateForm = ({ onSubmit, onCancel }: CreateFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: { inStock: false },
  });

  const submitHandler = async (data: FormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      sx={{ p: 2 }}
    >
      <Typography variant="h6" mb={2} color="textSecondary">
        Добавить новый элемент
      </Typography>

      <Stack spacing={1.25}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Укажите название" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Название"
              required
              fullWidth
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : " "}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{
            required: "Укажите цену",
            min: { value: 0.01, message: "Цена должна быть больше 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Цена"
              type="number"
              required
              fullWidth
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : " "}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: "Укажите описание" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Описание"
              multiline
              rows={3}
              fullWidth
              required
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : " "}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Выберите категорию" }}
          render={({ field }) => (
            <FormControl fullWidth required error={!!errors.category}>
              <InputLabel>Категория</InputLabel>
              <Select {...field} label="Категория">
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.category ? errors.category.message : " "}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="inStock"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="В наличии"
            />
          )}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {!isSubmitting && "Добавить"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
