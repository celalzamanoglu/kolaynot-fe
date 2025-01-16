import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  noteItem: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  noteItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  noteTime: {
    fontSize: 12,
    color: '#999',
  },
  favoriteButton: {
    padding: 10,
  },
});
