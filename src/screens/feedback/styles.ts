import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 22
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    minWidth: '45%'
  },
  categoryButtonSelected: {
    backgroundColor: '#F88909'
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  categoryButtonTextSelected: {
    color: '#fff'
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    color: '#333'
  },
  emailInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333'
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  submitButton: {
    backgroundColor: '#F88909',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
