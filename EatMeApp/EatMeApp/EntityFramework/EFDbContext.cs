﻿using EatMeApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EatMeApp.EntityFramework
{
    public class EFDbContext : DbContext
    {
        public EFDbContext()
        {
        }

        public DbSet<Event> Events { get; set; }
    }
}