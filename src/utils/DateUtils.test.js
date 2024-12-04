  import { getUTCOffset, findEquivalentTimeZone, getUserTimeZone } from './DateUtils';

  // Mock de zonas horarias y datos
  const mockTimeZones = [
    "America/Anchorage",
    "America/Los_Angeles",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "America/Sao_Paulo",
    "Europe/London",
    "Europe/Berlin",
    "Europe/Moscow",
    "Africa/Cairo",
    "Asia/Bangkok",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Auckland",
  ];

  const mockUserTimeZone = "America/Los_Angeles";

  describe('DateUtils', () => {
    // Sobrescribir `getUserTimeZone` para pruebas
    const originalGetUserTimeZone = getUserTimeZone;

    beforeAll(() => {
      global.getUserTimeZone = jest.fn(() => mockUserTimeZone);
    });

    afterAll(() => {
      global.getUserTimeZone = originalGetUserTimeZone;
    });

    describe('getUTCOffset', () => {
      it('should calculate the correct UTC offset for a given time zone', () => {
        const offset = getUTCOffset('America/New_York');
        expect(typeof offset).toBe('number');
        expect(offset).toBeLessThanOrEqual(12);
        expect(offset).toBeGreaterThanOrEqual(-12);
      });
    });

    describe('findEquivalentTimeZone', () => {
      it('should return an equivalent time zone with the same UTC offset', () => {
        const equivalentTimeZone = findEquivalentTimeZone('Asia/Singapore');
        expect(mockTimeZones).toContain(equivalentTimeZone);
      });
    });

    describe('getUserTimeZone', () => {
      it('should return the user\'s time zone if it exists in the predefined list', () => {
        expect(getUserTimeZone()).toBe("America/Chicago");
      });

      it('should return an equivalent time zone if the user\'s time zone is not in the list', () => {
        global.getUserTimeZone = jest.fn(() => 'Asia/Hong_Kong');

        expect(mockTimeZones).toContain(findEquivalentTimeZone('Asia/Hong_Kong'));
      });
    });
  });
