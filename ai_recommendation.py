import numpy as np
from sklearn.neighbors import NearestNeighbors

# Dummy data for properties [price, square_feet]
property_data = np.array([
    [1000, 800],
    [1200, 850],
    [950, 700],
    [2000, 1500],
    [2200, 1600],
    [800, 600],
    [3000, 2500],
])

property_ids = [1, 2, 3, 4, 5, 6, 7]

def recommend_properties(user_preferences):
    # Example user preferences [price, square_feet]
    user_data = np.array([user_preferences])

    # Fit KNN model
    knn = NearestNeighbors(n_neighbors=3).fit(property_data)
    distances, indices = knn.kneighbors(user_data)
    
    recommended_property_ids = [property_ids[i] for i in indices.flatten()]
    return recommended_property_ids

# Example use case
if __name__ == "__main__":
    user_preferences = [1100, 850]  # Input preferences for price and size
    recommendations = recommend_properties(user_preferences)
    print(f"Recommended Properties: {recommendations}")
