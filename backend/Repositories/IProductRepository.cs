using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAll();
        Task<Product?> Get(int id);
        Task<Product> Create(Product p);
        Task<bool> Update(int id, Product p);
        Task<bool> Delete(int id);
    }
}
