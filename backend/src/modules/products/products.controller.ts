import { Request, Response } from 'express'

import { CreateProductDto } from '@dto/products/create-product.dto'
import { UpdateProductDto } from '@dto/products/update-product.dto'

import service from './products.service'

class ProductsController {
  create = async (req: Request, res: Response) => {
    try {
      const payload: CreateProductDto = req.body
      const product = await service.createProduct(payload)
      res.status(201).json({ success: true, data: product })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Bad request'
      res.status(400).json({ success: false, message })
    }
  }

  findAll = async (_: Request, res: Response) => {
    const products = await service.getProducts()
    res.json({ success: true, data: products })
  }

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const product = await service.getProductById(id)
      res.json({ success: true, data: product })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const payload: UpdateProductDto = req.body
      const product = await service.updateProduct(id, payload)
      res.json({ success: true, data: product })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }

  remove = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      await service.deleteProduct(id)
      res.status(204).send()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }
}

export default new ProductsController()
