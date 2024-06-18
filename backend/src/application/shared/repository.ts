export interface BaseRepository<ENTITY extends { id?: string }> {
  /** Searches an object by its id and retrieves it, null if not found */
  findById: (id: string) => Promise<ENTITY | null>;

  /**
   * Searches an object by its id and retrieves it, throw error if not found
   * */
  getById: (id: string) => Promise<ENTITY>;

  /**
   * Change the data for a current object by its id, throw error if not found
   * */
  update: (data: ENTITY) => Promise<ENTITY>;

  /**
   * Create a new entity with the current data, throw error if the object already exist
   * */
  create: (data: ENTITY) => Promise<ENTITY>;

  /**
   * Remove a entity with the current data, throw error if the object not exist
   * */
  remove: (data: ENTITY) => Promise<void>;
}
