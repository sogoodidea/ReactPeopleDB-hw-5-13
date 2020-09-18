using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hw_5_13_ReactPeopleDB.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace hw_5_13_ReactPeopleDB.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addPerson")]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(p.Id);
        }

        [HttpPost]
        [Route("updatePerson")]
        public void Update(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(p);
        }

    }
}