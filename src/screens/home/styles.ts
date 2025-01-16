import { StyleSheet } from 'react-native';

export const PASTEL_ORANGE = '#F88909';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
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
    // Only round the left corners when swiped
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
  listContainer: {
    flex: 1,
    marginBottom: 90, // Space for the record button
  },
  deleteAction: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: -10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 10,
  },
  recordButton: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: PASTEL_ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  // Bottom Sheet Styles
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetContent: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 22,
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
  },
  waveContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PASTEL_ORANGE,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  doneButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
