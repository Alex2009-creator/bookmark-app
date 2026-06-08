// Старый интерфейс, который у вас уже был
export interface StatItem {
  id?: string
  userId?: string
  type: 'duration_min' | 'feeling_calm' | 'feeling_relax' | 'feeling_focus' | 'feeling_anxiety'
  value: number
  createdAt?: string
}

// НАШ НОВЫЙ ИНТЕРФЕЙС: Добавляем в этот же файл
export interface StatSummary {
  total_minutes: number
  total_calm: number
  total_relax: number
  total_focus: number
  total_anxiety: number
}
