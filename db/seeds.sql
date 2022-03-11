


INSERT INTO department (name)
VALUES
  ('Accounting'),
  ('Science'),
  ('Engineering'),
  ('Human Resources'),
  ('Technology');



  INSERT INTO role (title, salary, department_id)
VALUES
  ('Employee', 50000.15, 1),
  ('Manager', 652055.00, 3),
  ('Manager', 982050.80, 5),
  ('Engineer', 896520.00, 3),
  ('Scientist', 152650.52, 2);
  

  INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
   ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 4),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 5),
  ('Edward', 'Bellamy', 3, 2),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', NULL, 1);