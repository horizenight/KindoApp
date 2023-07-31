package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.*;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class CategoryController {

    private CategoryRepository categoryRepository;
    private final CategoryModelAssembler assembler;
    @Autowired
    public CategoryController(CategoryRepository categoryRepository, CategoryModelAssembler assembler) {
        this.categoryRepository = categoryRepository;
        this.assembler = assembler;
    }

    @GetMapping("/category/{id}")
    @CrossOrigin()
    CategoryModel one(@PathVariable UUID id) {

        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }
    @GetMapping("/api/category/all")
    @CrossOrigin()
    Iterable<CategoryModel> all() {
        return categoryRepository.findAll();
    }

    @PostMapping("/addCategory")
    @CrossOrigin()
    ResponseEntity<?> newCategory(@RequestBody CategoryModel newCategory) {

        EntityModel<CategoryModel> entityModel = assembler.toModel(categoryRepository.save(newCategory));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @DeleteMapping("/removeCategory/{id}")
    @CrossOrigin()
    ResponseEntity<?> deleteCategory(@PathVariable UUID id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/editIcon/{id}")
    @CrossOrigin()
    ResponseEntity<?> replaceCategory(@RequestBody CategoryModel newCategory, @PathVariable UUID id) {

        CategoryModel updatedCategory = categoryRepository.findById(id) //
                .map(category -> {
                    category.setIcon(newCategory.getIcon());
                    return categoryRepository.save(category);
                }) //
                .orElseGet(() -> {
                    newCategory.setId(id);
                    return categoryRepository.save(newCategory);
                });

        EntityModel<CategoryModel> entityModel = assembler.toModel(updatedCategory);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editCategoryData/{id}")
    @CrossOrigin()
    ResponseEntity<?> editCategory(@RequestBody CategoryModel newCategory, @PathVariable UUID id) {

        CategoryModel updatedCategory = categoryRepository.findById(id) //
                .map(category -> {
                    category.setName(newCategory.getName());
                    category.setIcon(newCategory.getIcon());
                    return categoryRepository.save(category);
                }) //
                .orElseGet(() -> {
                    newCategory.setId(id);
                    return categoryRepository.save(newCategory);
                });

        EntityModel<CategoryModel> entityModel = assembler.toModel(updatedCategory);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

}