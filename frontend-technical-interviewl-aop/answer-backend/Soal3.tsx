import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Soal3Backend() {
  const initialCode = `const express = require('express');
    const app = express();
    const port = 3000;
    
    let data = [];
    
    app.get('/data', (req, res) => {
      res.json(data);
    });
    
    app.post('/data', (req, res) => {
      const newData = req.body;
      data.push(newData);
      res.json(newData);
    });
    
    app.put('/data/:id', (req, res) => {
      const newId = req.params.id;
      const updatedData = req.body;
      data[newId] = updatedData;
      res.json(updatedData);
    });
    
    app.delete('/data', (req, res) => {
      data.splice(id, 1);
      res.json({ message: \`Data deleted from \\\`data\\\`\` });
    });
    
    app.listen(port, () => {
      console.log(\`Server is running on port \${port}\`);
    });
    `;

  const refactoredCode = `//service.ts
interface DataItem {
  [key: string]: any;
}

let data: DataItem[] = [];

export const getAll = (): DataItem[] => data;

export const add = (newData: DataItem): DataItem => {
  data.push(newData);
  return newData;
};

export const update = (id: number, updatedData: DataItem): DataItem | null => {
  if (!data[id]) return null;
  data[id] = updatedData;
  return updatedData;
};

export const remove = (id: number): boolean => {
  if (id < 0 || id >= data.length) return false;
  data.splice(id, 1);
  return true;
};

//controller.ts
import { Request, Response } from "express";
import * as dataService from "./services.ts";

const tryCatch =
  (handler: (req: Request, res: Response) => void | Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getData = tryCatch((req: Request, res: Response) => {
  res.json(dataService.getAll());
});

export const createData = tryCatch((req: Request, res: Response) => {
  const newData = req.body;
  const created = dataService.add(newData);
  res.status(201).json(created);
});

export const updateData = tryCatch((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const updatedData = req.body;
  const updated = dataService.update(id, updatedData);
  if (!updated) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  res.json(updated);
});

export const deleteData = tryCatch((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  if (!dataService.remove(id)) {
    res.status(404).json({ message: "Invalid ID" });
    return;
  }

  res.json({ message: "Data deleted" });
});

//route.ts
import express from "express";
import { getData, createData, updateData, deleteData } from "./controllers/dataController";

const router = express.Router();

router.get("/data", getData);
router.post("/data", createData);
router.put("/data/:id", updateData);
router.delete("/data/:id", deleteData);

export default router;

//server.ts
import express from "express";
import router from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`;
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <p>Express.js Code</p>
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {initialCode}
        </SyntaxHighlighter>
        <pre className=" whitespace-break-spaces">
          {`Perubahan:
1. Memisahkan Logika → Kode dibagi menjadi beberapa file:
- services/dataService.ts → Menyimpan dan mengelola data (CRUD).
- controllers/dataController.ts → Menangani request dan memanggil service.
- routes.ts → Menangani routing (menghubungkan request dengan controller).
- server.ts → Menginisialisasi server Express.

2. Menggunakan TypeScript → Menambah keamanan dengan tipe data agar lebih terstruktur dan mencegah error.
3. Error Handling dengan tryCatch → Membantu menangani error tanpa perlu menulis try-catch berulang kali.
4. Menghindari Mutasi Langsung → Data dikelola di services/dataService.ts, meningkatkan efisiensi memory dan performa.

Efek: 
- Meningkatkan modularitas (kode lebih terstruktur dan mudah diperbarui).
- Mempermudah scaling (jika ingin mengganti penyimpanan ke database nanti).
- Meningkatkan keamanan dan maintainability dengan pemisahan tanggung jawab.
`}
        </pre>
      </div>
      <div className="w-1/2">
        <p>Refactored Code</p>
        <SyntaxHighlighter language="typescript" style={atomDark}>
          {refactoredCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
