import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Box,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function EnvioForm() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteSelecionado, setClienteSelecioado] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  const [brindes, setBrindes] = useState([]);

  function adicionarBrinde() {

    if (!produtoSelecionado) {
      alert("Selecione um produto");
      return;
    }
  

    // Forma 1 de inserir no estado
    // const novoBrindes = [...brindes]
    // novoBrindes.push(produtoSelecionado)

    // Forma 2 de inserir no estado
    setBrindes([...brindes, produtoSelecionado])

    setProdutoSelecionado("")

  }

  console.log(brindes)

  useEffect(() => {
    // chamada para api para busca a lista de clientes
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch(() => alert("Erro ao buscar clientes"));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch(() => alert("Erro ao buscar os produtos"));
  }, []);

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography as="h1">Cadastro de produto</Typography>

          <FormControl fullWidth style={{ marginBottom: "40px" }}>
            <InputLabel id="cliente">Clientes</InputLabel>
            <Select
              labelId="cliente"
              label="Selecione um cliente"
              value={clienteSelecionado}
              onChange={(event) => setClienteSelecioado(event.target.value)}
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box style={{ display: "flex", gap: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id="cliente">Produto</InputLabel>
              <Select
                value={produtoSelecionado}
                onChange={(event) => setProdutoSelecionado(event.target.value)}
                labelId="Produto"
                label="Selecione um produto"
              >
                {produtos.map((produto) => (
                  <MenuItem key={produto.id} value={produto.id}>
                    {produto.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              disabled={!produtoSelecionado}
              onClick={adicionarBrinde}
              variant="contained"
              endIcon={<AddBoxIcon />}
            >
              Adicionar
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Boneco mascote </TableCell>
                  <TableCell>R$12 </TableCell>
                  <TableCell>
                    {/* Ícone de lixeira vermelho */}
                    <DeleteIcon style={{ color: "red" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Boneco mascote </TableCell>
                  <TableCell>R$12 </TableCell>
                  <TableCell>
                    {/* Ícone de lixeira vermelho */}
                    <DeleteIcon style={{ color: "red" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Boneco mascote </TableCell>
                  <TableCell>R$12 </TableCell>
                  <TableCell>
                    {/* Ícone de lixeira vermelho */}
                    <DeleteIcon style={{ color: "red" }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            display="flex"
            justifyContent="flex-end"
            style={{ marginTop: "20px" }}
          >
            <Typography>Valor total dos mimos: R$ 12,00</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined">Enviar</Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default EnvioForm;
