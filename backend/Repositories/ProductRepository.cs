using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _db;

        public ProductRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Product>> GetAll()
        {
            return await _db.Products.ToListAsync();
        }

        public async Task<Product?> Get(int id)
        {
            return await _db.Products.FindAsync(id);
        }

        public async Task<Product> Create(Product p)
        {
            _db.Products.Add(p);
            await _db.SaveChangesAsync();
            return p;
        }

        public async Task<bool> Update(int id, Product p)
        {
            var existing = await _db.Products.FindAsync(id);
            if (existing == null) return false;

            existing.Name = p.Name;
            existing.Price = p.Price;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var existing = await _db.Products.FindAsync(id);
            if (existing == null) return false;

            _db.Products.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
