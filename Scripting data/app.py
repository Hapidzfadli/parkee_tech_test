import pandas as pd
from datetime import datetime

def process_transaction_data():
    # 1. Read and combine all CSV files
    branch_a = pd.read_csv('branch_a.csv')
    branch_b = pd.read_csv('branch_b.csv')
    branch_c = pd.read_csv('branch_c.csv')
    
    # Combine all dataframes
    combined_df = pd.concat([branch_a, branch_b, branch_c], ignore_index=True)
    
    # 2. Clean the data
    # Remove rows with NaN values in specific columns
    cleaned_df = combined_df.dropna(subset=['transaction_id', 'date', 'customer_id'])
    
    # Convert date column to datetime
    cleaned_df['date'] = pd.to_datetime(cleaned_df['date'])
    
    # Remove duplicates based on transaction_id, keeping the latest date
    cleaned_df = cleaned_df.sort_values('date', ascending=False)
    cleaned_df = cleaned_df.drop_duplicates(subset=['transaction_id'], keep='first')
    
    # 3. Calculate total sales per branch
    # Calculate total sales (price * quantity) for each transaction
    cleaned_df['total_sales'] = cleaned_df['price'] * cleaned_df['quantity']
    
    # Group by branch and sum the total sales
    branch_sales = cleaned_df.groupby('branch')['total_sales'].sum().reset_index()
    
    # Save results to CSV
    branch_sales.to_csv('total_sales_per_branch.csv', index=False)
    
    return cleaned_df, branch_sales

def main():
    try:
        # Process the data
        cleaned_data, branch_sales = process_transaction_data()
        
        # Print summary of results
        print("\nCleaned Data Summary:")
        print(f"Total transactions processed: {len(cleaned_data)}")
        print("\nBranch Sales Summary:")
        print(branch_sales)
        
        print("\nResults have been saved to 'total_sales_per_branch.csv'")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()