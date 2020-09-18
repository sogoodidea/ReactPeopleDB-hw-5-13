using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace hw_5_13_ReactPeopleDB.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using (var context = new PeopleDataContext(_connectionString))
            {
                return context.People.ToList();
            }
        }

        public void AddPerson(Person person)
        {
            using (var context = new PeopleDataContext(_connectionString))
            {
                context.People.Add(person);
                context.SaveChanges();
            }
        }

        public void Update(Person person)
        {
            using (var context = new PeopleDataContext(_connectionString))
            {
                context.People.Attach(person);
                context.Entry(person).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            using (var context = new PeopleDataContext(_connectionString))
            {
                context.Database.ExecuteSqlRaw(
                    "DELETE FROM People WHERE Id = @id",
                    new SqlParameter("@id", id));
            }
        }

    }
}
