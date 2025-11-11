import { Request, Response } from 'express'
import service from './category.service'
import { CreateCategoryDto } from '../../dto/categories/create-category.dto'
import { UpdateCategoryDto } from '../../dto/categories/update-category.dto'

class CategoryController {
  create = async (req: Request, res: Response) => {
    try {
      const payload: CreateCategoryDto = req.body
      const category = await service.createCategory(payload)
      res.status(201).json({ success: true, data: category })
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message })
    }
  }

  findAll = async (_: Request, res: Response) => {
    const categories = await service.getCategories()
    res.json({ success: true, data: categories })
  }

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const category = await service.getCategoryById(id)
      res.json({ success: true, data: category })
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const payload: UpdateCategoryDto = req.body
      const category = await service.updateCategory(id, payload)
      res.json({ success: true, data: category })
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message })
    }
  }

  remove = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      await service.deleteCategory(id)
      res.status(204).send()
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message })
    }
  }
}

export default new CategoryController()
