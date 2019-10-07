import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const employee = await req.context.models.employees.find();
  return res.send(employee);
});

router.get('/:employeesId', async (req, res) => {
  const employees = await req.context.models.employees.findById(
    req.params.employeesId,
  );
  return res.send(employees);
});

router.post('/', async (req, res) => {
  const employees = await req.context.models.employees.create({
    text: req.body.text,
    user: req.context.me.id,
  });

  return res.send(employees);
});

router.delete('/:employeesId', async (req, res) => {
  const employees = await req.context.models.employees.findById(
    req.params.messageId,
  );

  let result = null;
  if (employees) {
    result = await employees.remove();
  }

  return res.send(result);
});

export default router;
