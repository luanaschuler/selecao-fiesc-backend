const express = require("express");

const {PrismaClient} = require("@prisma/client");
const { request, response } = require("express");

const prisma = new PrismaClient();

const companiesRoutes = express.Router();

companiesRoutes.post("/companies", async (request, response) => {
  const { name, cnpj, address, lineofbusiness, status } = request.body;
  const company = await prisma.company.create({data: {
    name,
    cnpj,
    address,
    lineofbusiness,
    status
  }})

  return response.status(201).json(company);
});

companiesRoutes.get("/companies", async(request, response) => {
    const companies = await prisma.company.findMany();

    return response.status(200).json(companies);
});

companiesRoutes.put("/companies", async (request, response) => {
    const { id, name, cnpj, address, lineofbusiness, status } = request.body;

    if (!id) {
        return response.status(400).json("Id is necessary")
    }

    const companyAlreadyExists = await prisma.company.findUnique({where: {id}});
    if (!companyAlreadyExists) {
        return response.status(404).json("Company does not exists")
    }
    const company = await prisma.company.update({ where: {
        id,
    },
        data: {
            name,
            cnpj,
            address,
            lineofbusiness,
            status
        }
});
    return response.status(200).json(company)
})

companiesRoutes.delete("/companies/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is necessary");
  }

  const companyAlreadyExist = await prisma.company.findUnique({
    where: { id: intId },
  });

  if (!companyAlreadyExist) {
    return response.status(404).json("Company does not exist");
  }

  await prisma.company.delete({ where: { id: intId } });

  return response.status(200).send();
});





module.exports = companiesRoutes;
