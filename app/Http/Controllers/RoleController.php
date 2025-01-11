<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display the role's profile form.
     */
    public function index(Request $request) : Response
    {
        $search = $request->search;
        $status = $request->status;
        $roles = Role::whereNot('name','superadmin')->get();

        return Inertia::render('Role/Index', [
            "title" => "Roles",
            'roles' => $roles,
        ]);
    }


    public function create(Request $request): Response
    {
        $permissions = $this->groupedPermission();
        return Inertia::render('Role/Form',[
            "title" => "Add Role",
            "permissions" => $permissions
        ]);
    }

    public function edit(Request $request,Role $role): Response
    {

        if ($role->name === 'superadmin') {
            abort(403);
        }
       
        $role->permission_pluck = $role->permissions->pluck('name');
        $permissions = $this->groupedPermission();
        return Inertia::render('Role/Form',[
            "title" => "Edit Role",
            'role' => $role,
            "permissions" => $permissions

        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'permissions' => 'nullable|array'
        ]);
        $role = Role::create(Arr::except($validate,['permissions']));
        $role->syncPermissions($validate['permissions']);
        return to_route('roles.index')->withSuccess("Role created successfuly");;
    }
    public function update(Request $request,Role $role)
    {
        
        if ($role->name === 'superadmin') {
            abort(403);
        }
        $validate = $request->validate([
            'name' => 'required|unique:roles,id,'.$role->id,
            'permissions' => 'nullable|array'
        ]);
        $role->update(Arr::except($validate,['permissions']));
        $role->syncPermissions($validate['permissions']);

        return to_route('roles.index')->withSuccess("Role updated successfuly");

    }

    public function destroy(Role $role)
    {
        if ($role->name === 'superadmin') {
            abort(403);
        }
        $role->delete();
        return redirect()->back()->withSuccess("Role deleted successfuly");

    }

    private function groupedPermission() {
        return $permissions = Permission::select('name')->get()
        ->groupBy(function ($permission) {
            return Str::before($permission->name, '.'); // Group by the prefix before the dot
        })
        ->map(function ($groupedPermissions, $key) {
            return [
                'name' => $key,
                'permissions' => $groupedPermissions->pluck('name')->toArray(), // Extract permission names as an array
            ];
        })
        ->values();
    }
}
