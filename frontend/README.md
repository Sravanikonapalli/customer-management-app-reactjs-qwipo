## challenge

**in time of using props instead of useParams()**

**solution and what I learned difference between props and useParams()**

You can get values via props, but only if someone passes them explicitly when rendering the component. For example:

<CustomerProfile id={123} name="John" number="1234567890" />


Then inside CustomerProfile:

const { id, name, number } = this.props;


-> Works fine.


**Why useParams() is needed:**

React Router works by matching the URL to a route. For example:

<Route path="/customers/:id" element={<CustomerProfile />} />


The :id in the URL is dynamic — it comes from the address bar, e.g., /customers/42.

You didn’t “pass” the ID manually as a prop — React Router knows it from the URL.

To access that dynamic id, you cannot just use this.props.id, because it wasn’t passed in JSX. You use useParams() to grab it:

const { id } = useParams();


Now id will be 42 if your URL is /customers/42.

*Key point:* props only works if someone manually passes the value. useParams() lets you get values directly from the URL without needing to pass them manually.