import { ProductPriority } from '../types'

export const priorityLabels: { [key in ProductPriority]: string } = {
    [ProductPriority.Low]: 'Low',
    [ProductPriority.Medium]: 'Medium',
    [ProductPriority.High]: 'High'
}